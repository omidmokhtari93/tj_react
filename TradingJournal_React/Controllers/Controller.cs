using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;
using Newtonsoft.Json;

namespace TradingJournal_React.Controllers
{
    [Route("api/[controller]")]
    public class TradeController : Controller
    {
        private readonly SqlConnection con = new SqlConnection(connectionString: "Server=faraz.r1host.com;Database=bornate1_tj;User ID=bornate1_user;Password=z6~tQq13");
        private readonly IHostingEnvironment hostingEnvironment;
        public TradeController(IHostingEnvironment environment)
        {
            hostingEnvironment = environment;
        }
        [HttpGet("/GetTrades")]
        public JsonResult GetTrades(int id, string startDate, string endDate)
        {
            var list = new List<TradeData>();
            con.Open();
            var cmd = new SqlCommand("SELECT [Id],[Created],[Modified],[EnterDate],[CloseDate]" +
                                     ",[Symbol],[Volume],[Profit],[TradeReason],[EnterRavani],[CloseRavani]" +
                                     ",[Comment],[FilePath],[Mistakes]FROM Journals " +
                                     "where (Id = " + id + " or " + id + " = -1) and " +
                                     "((EnterDate > '" + startDate + "' and CloseDate < '" + endDate + "') or " +
                                     " ('" + startDate + "' = '-1' and '" + endDate + "' = '-1')) order by Id desc", con);
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                list.Add(new TradeData()
                {
                    Id = rd["Id"].ToString(),
                    EnterDate = rd["EnterDate"].ToString(),
                    CloseDate = rd["CloseDate"].ToString(),
                    Symbol = rd["Symbol"].ToString(),
                    Volume = rd["Volume"].ToString(),
                    Profit = rd["Profit"].ToString(),
                    TradeReason = rd["TradeReason"].ToString(),
                    EnterRavani = rd["EnterRavani"].ToString(),
                    CloseRavani = rd["CloseRavani"].ToString(),
                    Comment = rd["Comment"].ToString(),
                    FilePath = rd["FilePath"].ToString(),
                    Mistakes = rd["Mistakes"].ToString()
                });
            }
            return new JsonResult(list);
        }

        [HttpPost("/SaveTrade")]
        public JsonResult SaveTrade()
        {
            var data = Request.Form["data"];
            var image = Request.Form.Files["img"];

            if (image != null)
            {
                var uploads = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
                var fileName = $"{Guid.NewGuid().ToString().Replace("-", "")}.png";
                var filePath = Path.Combine(uploads, fileName);
                image.CopyTo(new FileStream(filePath, FileMode.Create));
            }
            var obj = JsonConvert.DeserializeObject<TradeData>(data);
            con.Open();
            var cmd = new SqlCommand("INSERT INTO Journals ([Created],[Modified],[EnterDate],[CloseDate],[Symbol],[Volume]," +
                                     "[Profit],[TradeReason],[EnterRavani],[CloseRavani],[Comment],[FilePath],[Mistakes])" +
                                     "VALUES('" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff") + "' " +
                                     ", '" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff") + "'" +
                                     ",'" + obj.EnterDate + "' , '" + obj.CloseDate + "' , '" + obj.Symbol + "'" +
                                     ", '" + obj.Volume + "','" + obj.Profit + "'" +
                                     ",N'" + obj.TradeReason + "' , N'" + obj.EnterRavani + "',N'" + obj.CloseRavani + "'" +
                                     ", N'" + obj.Comment + "','" + "filepath" + "' , N'" + obj.Mistakes + "')", con);
            return new JsonResult(new { message = "با موفقیت ثبت شد", type = "success" });
            cmd.ExecuteNonQuery();
            con.Close();
        }

        public class TradeData
        {
            public string Id { get; set; }
            public string EnterDate { get; set; }
            public string CloseDate { get; set; }
            public string Symbol { get; set; }
            public string Volume { get; set; }
            public string Profit { get; set; }
            public string TradeReason { get; set; }
            public string EnterRavani { get; set; }
            public string CloseRavani { get; set; }
            public string Comment { get; set; }
            public string Mistakes { get; set; }
            public string FilePath { get; set; }
        }
    }
}
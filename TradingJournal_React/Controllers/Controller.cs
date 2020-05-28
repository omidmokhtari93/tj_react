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
            var cmd = new SqlCommand("SELECT TOP 10 [Id],[Created],[Modified],[EnterDate],[CloseDate]" +
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
            var fileName = "";
            if (image != null)
            {
                var uploads = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
                fileName = $"{Guid.NewGuid().ToString().Replace("-", "")}.png";
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
                                     ", N'" + obj.Comment + "','" + fileName + "' , N'" + obj.Mistakes + "')", con);
            cmd.ExecuteNonQuery();
            con.Close();
            return new JsonResult(new { message = "با موفقیت ثبت شد", type = "success" });
        }

        [HttpPost("/EditTrade")]
        public JsonResult EditJournal()
        {
            var data = Request.Form["data"];
            var image = Request.Form.Files["img"];
            var obj = JsonConvert.DeserializeObject<TradeData>(data);
            var fileName = "";
            if (image != null)
            {
                con.Open();
                var cmdd = new SqlCommand("select FilePath from Journals where Id = " + obj.Id + " ", con);
                var oldFileName = cmdd.ExecuteScalar().ToString();
                if (System.IO.File.Exists(Path.Combine(hostingEnvironment.WebRootPath , "uploads" , oldFileName)))
                {
                    System.IO.File.Delete(Path.Combine(hostingEnvironment.WebRootPath, "uploads", oldFileName));
                }
                con.Close();
                var uploads = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
                fileName = $"{Guid.NewGuid().ToString().Replace("-", "")}.png";
                var filePath = Path.Combine(uploads, fileName);
                image.CopyTo(new FileStream(filePath, FileMode.Create));
            }
            con.Open();
            var cmd = new SqlCommand("update Journals set " +
                                      "Modified = '" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff") + "'" +
                                      ",EnterDate = '" + obj.EnterDate + "'" +
                                      ",CloseDate = '" + obj.CloseDate + "'" +
                                      ",Symbol = '" + obj.Symbol + "'" +
                                      ",Volume = '" + obj.Volume + "'" +
                                      ",Profit = '" + obj.Profit + "'" +
                                      ",TradeReason = N'" + obj.TradeReason + "'" +
                                      ",EnterRavani = N'" + obj.EnterRavani + "'" +
                                      ",CloseRavani = N'" + obj.CloseRavani + "'" +
                                      ",Comment = N'" + obj.Comment + "'" +
                                      ",Mistakes =  N'" + obj.Mistakes + "'" +
                                      " " + (fileName == "" ? "" : ",FilePath = '" + fileName + "' ") + " " +
                                      " where Id = " + obj.Id + " ", con);

            cmd.ExecuteNonQuery();
            con.Close();
            return new JsonResult(new { message = "با موفقیت ویرایش شد", type = "success" });
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
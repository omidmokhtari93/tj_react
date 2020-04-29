using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;

namespace TradingJournal_React.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly SqlConnection con = new SqlConnection(connectionString: "Server=faraz.r1host.com;Database=bornate1_tj;User ID=bornate1_user;Password=z6~tQq13");
        [HttpGet("/GetTrades")]
        public JsonResult GetTrades([FromQuery]int id, string startDate, string endDate)
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
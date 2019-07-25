using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TheMove.Models;

namespace TheMove.Data
{
    public class InterestTypeRepository
    {
        readonly string _connectionString;

        public InterestTypeRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<InterestType> GetInterestTypeByInterest(int interestId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var interestTypesByInterest = db.Query<InterestType>(@"
                    Select * from interestType
                    Where interestId = @interestId").ToList();

                return interestTypesByInterest;
            }
            throw new Exception("Found no itineraries");
        }
    }
}

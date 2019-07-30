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
    public class InterestRepository
    {
        readonly string _connectionString;

        public InterestRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        const string ConnectionString = @"Server = localhost; Database = TheMove; Trusted_Connection = True;";

        public IEnumerable<Interest> GetInterestsByUser(int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var interests = db.Query<Interest>(@"
                    Select * from Interests
                    JOIN UserInterests
                    ON UserInterests.InterestId = Interests.id
                    Where userId = @userId",
                    new { userId }).ToList();

                return interests;
            }
            throw new Exception("Found no interests");
        }

        public IEnumerable<Interest> GetInterestsByType(int interestTypeId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var interestByType = db.Query<Interest>(@"
                    Select * from Interests
                    JOIN InterestInterestTypes
                    ON InterestInterestTypes.interestId = Interests.id
                    Where interestTypeId = @interestTypeId", new { interestTypeId }).ToList();

                return interestByType;
            }
            throw new Exception("Interest did not filter by type.");
        }

        public bool ActivateInterest(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateInterestQuery = @"
                    Update Interests
                    Set IsActive = 1
                    Where Id = @id";
                var parameters = new { Id = id };

                var rowsAffected = db.Execute(updateInterestQuery, parameters);

                if (rowsAffected == 1)
                {
                    return true;
                }
            }
            throw new Exception("Interest did not update");
        }

        public bool DeactivateInterest(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateInterestQuery = @"
                    Update Interests
                    Set IsActive = 0
                    Where Id = @id";
                var parameters = new { Id = id };

                var rowsAffected = db.Execute(updateInterestQuery, parameters);

                if (rowsAffected == 1)
                {
                    return true;
                }
            }
            throw new Exception("Interest did not update");
        }
    }
}

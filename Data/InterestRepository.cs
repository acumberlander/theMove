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

        public List<Object> GetInterestsByUser(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var interests = db.Query<Object>(@"
                                    Select * from Interests
                                    JOIN UserInterests
                                    ON UserInterests.InterestId = Interests.id
                                    Where userId = @userId").ToList();

                return interests;
            }
            throw new Exception("Found no interests");
        }

        public Interest ActivateInterest(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updatedInterest = db.QueryFirstOrDefault<Interest>(@"
                    Update Interests
                    Set IsActive = 1
                    Where Id = @id",
                    new { id });

                if (updatedInterest != null)
                {
                    return updatedInterest;
                }
            }
            throw new Exception("Interest did not update");
        }

        public Interest DeactivateInterest(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updatedInterest = db.QueryFirstOrDefault<Interest>(@"
                    Update Interests
                    Set IsActive = 0
                    Where Id = @id",
                    new { id });

                if (updatedInterest != null)
                {
                    return updatedInterest;
                }
            }
            throw new Exception("Interest did not update");
        }

        public List<Object> GetInterestsByType(int interestTypeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var interestByType = db.Query<Object>(@"
                    Select * from Interests
                    JOIN InterestInterestTypes
                    ON InterestInterestTypes.interestId = Interests.id
                    Where interestTypeId = @interestTypeId").ToList();

                    return interestByType;
            }
            throw new Exception("Interest did not filter by type.");
        }
    }
}

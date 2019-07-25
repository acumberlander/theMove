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

        public IEnumerable<Object> GetInterestsByUser(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var interests = db.Query<Object>(@"
                    Select * from Interests
                    JOIN UserInterests
                    ON UserInterests.InterestId = Interests.id
                    Where userId = @userId",
                    new { userId }).ToList();

                return interests;
            }
            throw new Exception("Found no interests");
        }

        //const string ConnectionString = @"Server = localhost\sqlexpress; Database = TheMove; Trusted_Connection = True;";

        //public List<Interest> GetInterestsByUser(int userId)
        //{
        //    var interests = new List<Interest>();

        //    var connection = new SqlConnection(ConnectionString);

        //    connection.Open();

        //    var getAllInterestsByUserCommand = connection.CreateCommand();
        //    getAllInterestsByUserCommand.CommandText = @"
        //            Select * from Interests
        //            JOIN UserInterests
        //            ON UserInterests.InterestId = Interests.id
        //            Where userId = @userId";

        //    var reader = getAllInterestsByUserCommand.ExecuteReader();

        //    while (reader.Read())
        //    {
        //        var id = (int)reader["Id"];
        //        var interestName = reader["InterestName"].ToString();
        //    }

        //    connection.Close();

        //    return interests;
        //}

        public bool ActivateInterest(int id)
        {
            using (var db = new SqlConnection(_connectionString))
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
            using (var db = new SqlConnection(_connectionString))
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

        public IEnumerable<Object> GetInterestsByType(int interestTypeId)
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

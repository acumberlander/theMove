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
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<User> GetAllUsers(string firstName, string lastName, string username, string password)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>("Select * from Users").ToList();

                var itineraries = db.Query<Itinerary>("Select * from Itinerary").ToList();

                var locations = db.Query<Location>("Select * from Location").ToList();

                var interests = db.Query<Interest>("Select * from Interest").ToList();

                foreach (var user in users)
                {
                    user.Itineraries = itineraries.Where(itinerary => itinerary.UserId == user.Id).ToList();
                    user.Interests = interests.Where(interest => interest.UserId == user.Id).ToList();
                    user.Locations = locations.Where(location => location.UserId == user.Id).ToList();
                }

                return users;
            }
        }
    }
}

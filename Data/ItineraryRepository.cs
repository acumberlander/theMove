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
    public class ItineraryRepository
    {
        readonly string _connectionString;

        public ItineraryRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        Itinerary newItinerary;

        const string ConnectionString = @"Server = localhost; Database = TheMove; Trusted_Connection = True;";

        public IEnumerable<Itinerary> GetItinerariesByUser(int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var itinerariesByUser = db.Query<Itinerary>(@"
                    SELECT * FROM itineraries
	                WHERE userId = @userId;",
                    new { userId }).ToList();

                return itinerariesByUser;
            }
            throw new Exception("Found no itineraries");
        }

        public Itinerary AddNewItinerary(int userId, string itineraryName)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into Itineraries(userId, itineraryName)
                    Output inserted.*
                    Values(@userId, @itineraryName)";

                var parameters = new
                {
                    UserId = userId,
                    ItineraryName = itineraryName
                };

                newItinerary = db.QueryFirstOrDefault<Itinerary>(insertQuery, parameters);

                if (newItinerary != null)
                {
                    return newItinerary;
                }
            }

            throw new Exception("Could not create a payment type");
        }

        // Creates new UserItinerary
        public UserItinerary AddNewUserItinerary(int userId, int itineraryId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into UserItineraries(userId, itineraryId)
                    Output inserted.*
                    Values(@userId, @itineraryId)";

                var parameters = new
                {
                    userId = newItinerary.UserId,
                    ItineraryId = itineraryId
                };

                var newUserItinerary = db.QueryFirstOrDefault<UserItinerary>(insertQuery, parameters);

                if (newUserItinerary != null)
                {
                    return newUserItinerary;
                }
            }

            throw new Exception("Could not create a itineraryLocation");
        }

        public Itinerary UpdateItineraryName(Itinerary itineraryToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                UPDATE Itineraries
                SET    itineraryName = @itineraryName
                WHERE id = @id";

                var rowAffected = db.Execute(updateQuery, itineraryToUpdate);

                if (rowAffected == 1)
                    return itineraryToUpdate;
            }
                throw new Exception("Could not update itinerary name");
        }

        public Itinerary DeleteItinerary(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var itineraryToDelete = db.QueryFirstOrDefault<Itinerary>(@"
                                     Delete from itineraries
                                     Output deleted.*
                                     Where Id = @id",
                                     new { id });

                if (itineraryToDelete != null)
                {
                    return itineraryToDelete;
                }
            }
            throw new Exception("Itinerary did not delete.");
        }
    }
}

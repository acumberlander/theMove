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

        public List<Itinerary> GetItinerariesByUser(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var itinerariesByUser = db.Query<Itinerary>(@"
                                    Select * from itineraries
                                    Where userId = @id").ToList();

                return itinerariesByUser;
            }
            throw new Exception("Found no itineraries");
        }

        public Itinerary UpdateItineraryName(Itinerary itineraryToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                UPDATE [dbo].[Itinerary]
                SET    [Name] = @name,
                WHERE id = @id";

                var rowAffected = db.Execute(updateQuery, itineraryToUpdate);

                if (rowAffected == 1)
                {
                    return itineraryToUpdate;
                }
                throw new Exception("Could not update itinerary name");
            }
        }

        public Itinerary DeleteItinerary(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var itineraryToDelete = db.QueryFirstOrDefault<Itinerary>(@"
                                     Delete from intineraries
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

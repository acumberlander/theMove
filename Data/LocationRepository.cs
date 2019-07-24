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
    public class LocationRepository
    {
        readonly string _connectionString;

        public LocationRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public List<Location> GetLocationsByUser(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var locationsByUser = db.Query<Location>(@"
                                    Select * from locations
                                    Where userId = @id").ToList();

                return locationsByUser;
            }

            throw new Exception("Found no locations");
        }

        public List<Object> GetLocationsByItinerary(int intineraryId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var locationsByItinerary = db.Query<Object>(@"
                                     Select * from locations
                                     JOIN ItineraryLocations
                                     ON ItineraryLocations.LocationId = Locations.id
                                     Where itineraryId = @itineraryId").ToList();

                return locationsByItinerary;
            }

            throw new Exception("Found no locations");
        }

        public Location UpdateLocation(Location locationToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                UPDATE [dbo].[Locations]
                SET    [Name] = @name,
                WHERE  id = @id";

                var rowAffected = db.Execute(updateQuery, locationToUpdate);

                if (rowAffected == 1)
                {
                    return locationToUpdate;
                }
                throw new Exception("Could not update location");
            }
        }

        public Location DeleteLocation(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var locationToDelete = db.QueryFirstOrDefault<Location>(@"
                                     Delete from locations
                                     Output deleted.*
                                     Where Id = @id",
                                     new { id });

                if (locationToDelete != null)
                {
                    return locationToDelete;
                }
            }
            throw new Exception("Location did not delete.");
        }
    }
}

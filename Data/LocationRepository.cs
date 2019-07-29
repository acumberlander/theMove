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

        const string ConnectionString = @"Server = localhost; Database = TheMove; Trusted_Connection = True;";

        public List<Location> GetLocationsByItinerary(int itineraryId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var locationsByItinerary = db.Query<Location>(@"
                    Select * from locations
	                Where ItineraryId = @itineraryId;",
                    new { itineraryId }).ToList();

                return locationsByItinerary;
            }

            throw new Exception("Found no locations");
        }

        public Location AddNewLocation(int userId, int itineraryId, string locationName)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into Locations(userId, itineraryId, locationName)
                    Output inserted.*
                    Values(@userId, @itineraryId, @locationName)";

                var parameters = new
                {
                    UserId = userId,
                    ItineraryId = itineraryId,
                    LocationName = locationName
                };

                var newLocation = db.QueryFirstOrDefault<Location>(insertQuery, parameters);

                if (newLocation != null)
                {
                    return newLocation;
                }
            }

            throw new Exception("Could not create a location");
        }

        public Location UpdateLocation(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var locationToUpdate = db.Query<Location>(@"
                UPDATE Locations
                SET    UserId = @userId,
                       ItineraryId = @itineraryId,
                       LocationName = @locationName
                WHERE  id = @id",
                new { id });

                if (locationToUpdate != null)
                    return locationToUpdate;

            }
            throw new Exception("Could not update location");
        }

        public Location DeleteLocation(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
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

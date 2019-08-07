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

        Location newLocation;

        // Gets all locations based on itinerary id
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

        // Creates new location
        public Location AddNewLocation(int userId, int itineraryId, string locationName, string address, decimal rating, int price, string photo_ref, string html_attr)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into Locations(userId, itineraryId, locationName, address, rating, price, photo_ref, html_attr)
                    Output inserted.*
                    Values(@userId, @itineraryId, @locationName, @address, @rating, @price, @photo_ref, @html_attr)";

                var parameters = new
                {
                    UserId = userId,
                    ItineraryId = itineraryId,
                    LocationName = locationName,
                    Address = address,
                    Rating = rating,
                    Price = price,
                    Photo_ref = photo_ref,
                    Html_attr = html_attr
                };

                newLocation = db.QueryFirstOrDefault<Location>(insertQuery, parameters);

                if (newLocation != null)
                {
                    return newLocation;
                }
            }

            throw new Exception("Could not create a location");
        }

        // Creates new LocationInterestType
        public LocationInterestType AddNewLocationInterestType(int? interestTypeId, int locationId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into LocationInterestTypes(interestTypeId, locationId)
                    Output inserted.*
                    Values(@interestTypeId, @locationId)";

                var parameters = new
                {
                    InterestTypeId = interestTypeId,
                    LocationId = locationId
                };

                var newLocationInterestType = db.QueryFirstOrDefault<LocationInterestType>(insertQuery, parameters);

                if (newLocationInterestType != null)
                {
                    return newLocationInterestType;
                }
            }

            throw new Exception("Could not create a locationInterestType");
        }

        // Creates new ItineraryLocation
        public ItineraryLocation AddNewItineraryLocation(int locationId, int itineraryId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into ItineraryLocations(locationId, itineraryId)
                    Output inserted.*
                    Values(@locationId, @itineraryId)";

                var parameters = new
                {
                    LocationId = newLocation.Id,
                    ItineraryId = itineraryId
                };

                var newItineraryLocation = db.QueryFirstOrDefault<ItineraryLocation>(insertQuery, parameters);

                if (newItineraryLocation != null)
                {
                    return newItineraryLocation;
                }
            }

            throw new Exception("Could not create a itineraryLocation");
        }

        // Sets location to new info
        public Location UpdateLocation(Location locationToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                UPDATE Locations
                SET    UserId = @userId,
                       ItineraryId = @itineraryId,
                       LocationName = @locationName
                WHERE  id = @id";

                var rowAffected = db.Execute(updateQuery, locationToUpdate);

                if (rowAffected == 1)
                    return locationToUpdate;

            }
            throw new Exception("Could not update location");
        }

        // Deletes one location
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

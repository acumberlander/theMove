using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using TheMove.Data;
using TheMove.Models;

namespace TheMove.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        readonly LocationRepository _locationRepository;

        public LocationsController(LocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        // Gets all locations by user id
        [HttpGet("getLocationsByItinerary/{itineraryId}")]
        public ActionResult GetLocationsByItinerary(int itineraryId)
        {
            var locationsByItinerary = _locationRepository.GetLocationsByItinerary(itineraryId);

            return Ok(locationsByItinerary);
        }

        // Adds a new location 
        [HttpPost("createLocation")]
        public ActionResult AddLocation(CreateLocationRequest createLocationRequest)
        {
            var newLocation = _locationRepository.AddNewLocation(
                createLocationRequest.UserId,
                createLocationRequest.ItineraryId,
                createLocationRequest.LocationName);

            // Adds new locationInterestType
            _locationRepository.AddNewLocationInterestType(
                createLocationRequest.InterestTypeId,
                newLocation.Id);

            // Adds new itineraryLocation
            _locationRepository.AddNewItineraryLocation(
                createLocationRequest.LocationId,
                createLocationRequest.ItineraryId);

            return Created($"/api/locations/{newLocation.Id}", newLocation);
        }

        // Updates location name by id
        [HttpPut("updateLocation/{id}")]
        public ActionResult UpdateLocation(Location locationToUpdate)
        {
            var updatedLocation = _locationRepository.UpdateLocation(locationToUpdate);

            return Ok(updatedLocation);
        }

        // Deletes location by id
        [HttpDelete("deleteLocation/{id}")]
        public ActionResult DeleteItinerary(int id)
        {
            var locationToDelete = _locationRepository.DeleteLocation(id);

            return Ok(locationToDelete);
        }
    }
}
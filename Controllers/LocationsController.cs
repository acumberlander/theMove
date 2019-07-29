using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult AddLocation(CreateLocationRequest createRequest)
        {
            var newLocation = _locationRepository.AddNewLocation(
                createRequest.UserId,
                createRequest.Id,
                createRequest.LocationName);

            return Created($"/api/locations/{newLocation.Id}", newLocation);
        }

        // Updates location name by id
        [HttpPut("updateLocation/{id}")]
        public ActionResult UpdateLocation(int id)
        {
            var updatedLocation = _locationRepository.UpdateLocation(id);

            return Ok(updatedLocation);
        }
    }
}
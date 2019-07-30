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
    public class ItinerariesController : ControllerBase
    {
        readonly ItineraryRepository _itineraryRepository;

        public ItinerariesController(ItineraryRepository itineraryRepository)
        {
            _itineraryRepository = itineraryRepository;
        }

        // Gets all itineraries by user id
        [HttpGet("getItinerariesByUser/{userId}")]
        public ActionResult GetItinerariesByUser(int userId)
        {
            var itinerariesByUser = _itineraryRepository.GetItinerariesByUser(userId);

            return Ok(itinerariesByUser);
        }

        // Updates itinerary name by id
        [HttpPut("updateItineraryName/{id}")]
        public  ActionResult UpdateItineraryName(Itinerary itineraryToUpdate)
        {
            var updatedItineraryName = _itineraryRepository.UpdateItineraryName(itineraryToUpdate);

            return Ok(updatedItineraryName);
        }

        // Adds a new itinerary 
        [HttpPost("createItinerary")]
        public ActionResult AddItinerary(CreateItineraryRequest createRequest)
        {
            var newItinerary = _itineraryRepository.AddNewItinerary(
                createRequest.UserId,
                createRequest.ItineraryName);

            // Adds new userItinerary
            _itineraryRepository.AddNewUserItinerary(
                createRequest.UserId,
                newItinerary.Id);

            return Created($"/api/itineraries/{newItinerary.Id}", newItinerary);
        }


        // DELETE: api/ApiWithActions/5
        [HttpDelete("deleteItinerary/{id}")]
        public ActionResult DeleteItinerary(int id)
        {
            var itineraryToDelete = _itineraryRepository.DeleteItinerary(id);

            return Ok(itineraryToDelete);
        }
    }
}

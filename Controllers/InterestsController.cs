using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheMove.Data;
using TheMove.Models;

namespace TheMove.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterestsController : ControllerBase
    {
        readonly InterestRepository _interestRepository;

        public InterestsController(InterestRepository interestRepository)
        {
            _interestRepository = interestRepository;
        }

        // Gets all interests by user id
        [HttpGet("getInterestsByUser/{userId}")]
        public ActionResult GetInterestsByUser(int userId)
        {
            var interestsByUser = _interestRepository.GetInterestsByUser(userId);

            return Ok(interestsByUser);
        }

        // Gets all interests by interest type id
        [HttpGet("getInterestsByType{interestId}"]
        public ActionResult GetInterestsByType(int interestId)
        {
            var interestsByType = _interestRepository.GetInterestsByType(interestId);

            return Ok(interestsByType);
        }

        // Sets interest to active by id
        [HttpPut("activateInterest/{id}")]
        public Interest ActivateInterest(Interest interestsObject)
        {
            var activatedInterest = _interestRepository.ActivateInterest(interestsObject.Id);

            return activatedInterest;
        }

        // Sets interest to inactive by id
        [HttpPut("deactivateInterest/{id}")]
        public Interest DeactivateInterest(Interest interestsObject)
        {
            var deactivatedInterest = _interestRepository.DeactivateInterest(interestsObject.Id);

            return deactivatedInterest;
        }
    }
}

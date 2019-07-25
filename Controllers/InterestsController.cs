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
        public Object GetInterestsByUser(int userId)
        {
            var interestsByUser = _interestRepository.GetInterestsByUser(userId);

            return interestsByUser;
        }

        // Gets all interests by interest type id
        [HttpGet("getInterestsByType{interestTypeId}")]
        public ActionResult GetInterestsByType(int interestTypeId)
        {
            var interestsByType = _interestRepository.GetInterestsByType(interestTypeId);

            return Ok(interestsByType);
        }

        // Sets interest to active by id
        [HttpPut("activateInterest/{id}")]
        public ActionResult ActivateInterest(int id)
        {
            var activatedInterest = _interestRepository.ActivateInterest(id);

            return Ok(activatedInterest);
        }

        // Sets interest to inactive by id
        [HttpPut("deactivateInterest/{id}")]
        public ActionResult DeactivateInterest(int id)
        {
            var deactivatedInterest = _interestRepository.DeactivateInterest(id);

            return Ok(deactivatedInterest);
        }
    }
}

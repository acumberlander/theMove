using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheMove.Data;

namespace TheMove.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterestTypeController : ControllerBase
    {
        readonly InterestTypeRepository _interestTypeRepository;

        public InterestTypeController(InterestTypeRepository interestTypeRepository)
        {
            _interestTypeRepository = interestTypeRepository;
        }

        // Gets all interests by interest id
        [HttpGet("getInterestTypeByInterest/{interestId}")]
        public ActionResult GetInterestsByUser(int interestId)
        {
            var interestsByUser = _interestTypeRepository.GetInterestTypeByInterest(interestId);

            return Ok(interestsByUser);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RestSharp;


namespace TheMove.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly IConfiguration _config;

        public PlacesController(IConfiguration config)
        {
            _config = config;
        }

        // This is an exmaple of a query => 'restaurants+in+Sydney&'
        [HttpGet("search/{query}")]
        public ActionResult GetPlaces(string query)
        {
            var baseUrl = _config.GetValue<string>("baseUrl");
            var apiKey = _config.GetValue<string>("apiKey");

            var client = new RestClient(baseUrl);

            var request = new RestRequest($"json?query={query}?&key={apiKey}");
            var response = client.Get(request);

            return Content(response.Content, "application/json");
        }
        
    }
}
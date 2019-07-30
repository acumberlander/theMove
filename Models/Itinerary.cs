using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheMove.Models
{
    public class Itinerary
    {
        //Properties
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ItineraryName { get; set; }

        // List of Locations
        public List<Location> Locations { get; set; }
    }
}

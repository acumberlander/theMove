using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheMove.Models
{
    public class Location
    {
        //Properties
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ItineraryId { get; set; }
        public string LocationName { get; set; }
    }
}

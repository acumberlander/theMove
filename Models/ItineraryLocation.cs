using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheMove.Models
{
    public class ItineraryLocation
    {
        //Properties
        public int Id { get; set; }
        public int LocationId { get; set; }
        public int ItineraryId { get; set; }
    }
}

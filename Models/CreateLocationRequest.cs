using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheMove.Models
{
    public class CreateLocationRequest
    {
        //Properties
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ItineraryId { get; set; }
        public int? InterestTypeId { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public string Address { get; set; }
        public int Price { get; set; }
        public decimal Rating { get; set; }
        public string Photo_ref { get; set; }
        public string Html_attr { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}

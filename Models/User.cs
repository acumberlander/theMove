using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheMove.Models
{
    public class User
    {   
        //Properties
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public decimal Budget { get; set; }
        public int TraveRadius { get; set; }

        // List of user's interests
        public List<Interest> Interests { get; set; }

        // List of user's itineraries
        public List<Itinerary> Itineraries { get; set; }

        // List of user's locations
        public List<Location> Locations { get; set; }

        // List of user's interestTypes
        public List<InterestType> InterestTypes { get; set; }
    }
}

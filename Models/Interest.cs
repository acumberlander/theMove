using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheMove.Models
{
    public class Interest
    {
        //Properties
        public int Id { get; set; }
        public int UserId { get; set; }
        public int InterestTypeId { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        // List of InterestTypes
        public List<InterestType> InterestTypes { get; set; }
    }
}

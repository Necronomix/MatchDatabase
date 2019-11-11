using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MatchService.DataSchema;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace MatchService.Controllers
{
    [Route("api/[controller]")]
    public class MatchDataController : Controller
    {
        private IHostingEnvironment hostingEnvironment;
        private List<Match> matches;


        public string MatchesJSONFilePath
        {
            get
            {
                return hostingEnvironment.ContentRootPath;
            }
        }


        public MatchDataController(IHostingEnvironment environment)
        {
            if (environment is null)
            {
                throw new ArgumentNullException(nameof(environment));
            }
            hostingEnvironment = environment;

            LoadMatches();

        }

        private void LoadMatches()
        {
            string rootPath = MatchesJSONFilePath;

            using (StreamReader sr = new StreamReader(System.IO.Path.Combine(rootPath, "DataSchema", "matches.json")))
            {
                string matchJSON = sr.ReadToEnd();

                this.matches = JsonConvert.DeserializeObject<List<Match>>(matchJSON);
            }

            if (this.matches == null)
            {
                throw new FileNotFoundException("The matches.json could not be loaded and deserialized!");
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<Match> MatchInfo()
        {
            return matches;
        }
    }
}

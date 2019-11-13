using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatchService.DataSchema
{
   
    public class HomeTeam
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public object Logo { get; set; }
        public string LogoUrl { get; set; }
        public int Ranking { get; set; }
        public string Message { get; set; }
    }

    public class AwayTeam
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public object Logo { get; set; }
        public string LogoUrl { get; set; }
        public int Ranking { get; set; }
        public string Message { get; set; }
    }

    public class MatchEvent
    {
        public int Id { get; set; }
        public int MatchId { get; set; }
        public int EventMinute { get; set; }
        public int ElapsedSeconds { get; set; }
        public int TeamId { get; set; }
        public string Description { get; set; }
        public string FullDescription { get; set; }
        public string EventTypeIcon { get; set; }
        public string EventType { get; set; }
        public int EventTypeEnum { get; set; }
        public int PlayerId { get; set; }
        public object Player { get; set; }
        public string Identifier { get; set; }
        public object AssistPlayers { get; set; }
        public object AssistPlayerNames { get; set; }
        public object Modifier { get; set; }
        public object Score { get; set; }
        public bool IsGoal { get; set; }
    }
    /// <summary>
    /// Schema base created with http://json2csharp.com/
    /// Minor changes made for example DateTime made nullable
    /// </summary>
    public class Match
    {
        public int Id { get; set; }
        public object Round { get; set; }
        public int RoundNumber { get; set; }
        public DateTime? MatchDate { get; set; }
        public HomeTeam HomeTeam { get; set; }
        public AwayTeam AwayTeam { get; set; }
        public int HomeGoals { get; set; }
        public int AwayGoals { get; set; }
        public int Status { get; set; }
        public int PlayedMinutes { get; set; }
        public object SecondHalfStarted { get; set; }
        public DateTime? GameStarted { get; set; }
        public List<MatchEvent> MatchEvents { get; set; }
        public List<object> PeriodResults { get; set; }
        public bool OnlyResultAvailable { get; set; }
        public int Season { get; set; }
        public string Country { get; set; }
        public string League { get; set; }
    }
}

export class RegexExpressions {
    
    // Regular Expressions
    public static readonly TableNameRegex: RegExp = new RegExp(/\Table \'(\w+)\'/, "i");    
    public static readonly ScanCountRegex: RegExp = new RegExp(/\Scan count (\d+)/, "i");
    public static readonly LogicalReadsRegex: RegExp = new RegExp(/\,\s*logical reads (\d+)/, "i");
    public static readonly PhysicalReadsRegex: RegExp = new RegExp(/\,\s*physical reads (\d+)/, "i");
    public static readonly ReadAheadReadsRegex: RegExp = new RegExp(/\,\s*read-ahead reads (\d+)/, "i");
    public static readonly LobLogicalReadsRegex: RegExp = new RegExp(/\lob logical reads (\d+)/, "i");
    public static readonly LobPhysicalReadsRegex: RegExp = new RegExp(/\lob physical reads (\d+)/, "i");
    public static readonly LobReadAheadRegex: RegExp = new RegExp(/\lob read-ahead reads (\d+)/, "i");
    
    public static readonly CPUTimeRegex: RegExp = new RegExp(/\CPU time = (\d+)/, "i");
    public static readonly ElapsedTimeRegex: RegExp = new RegExp(/\elapsed time (\d+)/, "i");
    
    public static readonly RowsAffectedRegex: RegExp = new RegExp(/(\d+) row/, "i");
    
    public static readonly TableDataRegex: RegExp = new RegExp(/\w+/, "i");
    
}

function address(arr = []) {
    return function (ctx) {
        ctx.address = arr[Math.floor(Math.random() * arr.length)];
    };
};

function blacklist(arr = [], page = '') {
    return function (ctx) {
        if (arr.includes(ctx.url.hostname)) ctx.clientResponse.end(page);
    };
};

exports.address = address;
exports.blacklist = blacklist;
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(rateLimit({ windowMs: 60_000, max: 100 }));
app.use(logRequest);
app.use(stealthHeaders);

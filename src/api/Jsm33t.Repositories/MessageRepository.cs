﻿using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;
using Jsm33t.Entities.Shared;
using Dapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data;

namespace Jsm33t.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        protected readonly IOptionsMonitor<Jsm33tConfig> _config;
        private readonly IDbConnection _dbConnection;
        protected readonly ILogger _logger;
        private string _conStr;

        public MessageRepository(IOptionsMonitor<Jsm33tConfig> config, ILogger<MessageRepository> logger, IDbConnection dbConnection)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
            _dbConnection = dbConnection;
        }
        public  async Task<DbResult> CheckAndAddMessage(Message_AddRequest messageRequest)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@Content", messageRequest.Content, DbType.String, ParameterDirection.Input);
            parameters.Add("@Name", messageRequest.Name, DbType.String, ParameterDirection.Input);
            parameters.Add("@Email", messageRequest.Email, DbType.String, ParameterDirection.Input);
            parameters.Add("@Topic", messageRequest.Topic, DbType.String, ParameterDirection.Input);
            parameters.Add("@Origin", messageRequest.Origin, DbType.String, ParameterDirection.Input);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _dbConnection.ExecuteAsync("sproc_CheckAndAddMessage", parameters, commandType: CommandType.StoredProcedure);

            int resultValue = parameters.Get<int>("@Result");
            DbResult result = (DbResult)resultValue;

            return result;
        }
    }



}

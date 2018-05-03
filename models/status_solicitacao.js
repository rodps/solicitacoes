function associate(models){
    const {
        solicitacoes,
        status_solicitacao
    } = models;
    status_solicitacao.belongsTo(solicitacoes, { foreignKey:'solicitacao_id' });
}

module.exports = function(sequelize , DataTypes){
	var status_solicitacao = sequelize.define('status_solicitacao', {
		status: DataTypes.ENUM('ABERTO','REQUISITADO','COMPRADO','DESERTO','CANCELADA'),
		data: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
	}, {timestamps: false});

    status_solicitacao.associate = associate;
    return status_solicitacao;
}
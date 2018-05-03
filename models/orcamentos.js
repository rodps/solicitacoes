function associate(models){
    const {
        solicitacoes,
        orcamentos
    } = models;
    orcamentos.belongsTo(solicitacoes, { foreignKey:'solicitacao_id' });
}

module.exports = function(sequelize , DataTypes){
    var orcamentos = sequelize.define('orcamentos', {
        origem: DataTypes.STRING,
        valor: DataTypes.FLOAT,
        cnpj_forncedor: DataTypes.STRING,
        nome_fornecedor: DataTypes.STRING,
    }, {timestamps: false});

    orcamentos.associate = associate;
    return orcamentos;
}
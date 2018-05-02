function associate(models) {
  const { orcamentos, solicitacoes } = models;
  orcamentos.belongsTo(solicitacoes, { foreignKey: "solicitacao_id" });
}

module.exports = (sequelize, DataTypes) => {
  const orcamentos = sequelize.define("orcamentos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cnpj_forncedor: DataTypes.STRING,
    nome_fornecedor: DataTypes.STRING,
    valor_unitario: DataTypes.DOUBLE,
    valor_total: DataTypes.DOUBLE
  });
  orcamentos.associate = associate;
  return orcamentos;
};

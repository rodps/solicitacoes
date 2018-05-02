function associate(models) {
  const { solicitacoes, usuarios, produtos, orcamentos } = models;
  solicitacoes.belongsTo(usuarios, { foreignKey: "usuario_id" });
  solicitacoes.hasOne(produtos);
  solicitacoes.hasMany(orcamentos);
}

module.exports = (sequelize, DataTypes) => {
  const solicitacoes = sequelize.define("solicitacoes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: DataTypes.STRING,
    quantidade_produto: DataTypes.INTEGER,
    justificativa: DataTypes.STRING
  });
  solicitacoes.associate = associate;
  return solicitacoes;
};

function associate(models) {
  const { produtos, solicitacoes } = models;
  produtos.belongsTo(solicitacoes, { foreignKey: "solicitacao_id" });
}

module.exports = (sequelize, DataTypes) => {
  const produtos = sequelize.define("produtos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: DataTypes.STRING,
    cod_siorg: DataTypes.STRING,
    descricao_siorg: DataTypes.STRING,
    categoria: DataTypes.STRING,
    condicao: {
      type: DataTypes.ENUM,
      values: ["apto", "inapto", "emManutencao"]
    }
  });
  produtos.associate = associate;
  return produtos;
};

function associate(models) {
  const { usuarios, solicitacoes } = models;
  usuarios.hasMany(solicitacoes);
}

module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define("usuarios", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    perfil: {
      type: DataTypes.ENUM,
      values: ["admin", "solicitante"],
      defaultValue: "solicitante"
    }
  });

  usuarios.associate = associate;
  return usuarios;
};

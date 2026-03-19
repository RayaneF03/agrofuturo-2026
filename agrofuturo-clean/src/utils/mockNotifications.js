// Notificações falsas para teste
export const mockNotifications = {
  success: [
    {
      title: "Cadastro realizado!",
      message: "Novo sensor adicionado com sucesso",
      type: "success",
    },
    {
      title: "Dados sincronizados",
      message: "Informações atualizadas com sucesso",
      type: "success",
    },
    {
      title: "Configurações salvas",
      message: "Suas preferências foram atualizadas",
      type: "success",
    },
  ],
  error: [
    {
      title: "Erro na conexão",
      message: "Não foi possível carregar os dados. Tente novamente.",
      type: "error",
    },
    {
      title: "Falha ao enviar",
      message: "Erro ao sincronizar com o servidor",
      type: "error",
    },
    {
      title: "Campo obrigatório",
      message: "Por favor, preencha todos os campos necessários",
      type: "error",
    },
  ],
  warning: [
    {
      title: "Praga detectada",
      message: "Atividade de broca-do-café identificada na área B",
      type: "warning",
    },
    {
      title: "Sensor com bateria baixa",
      message: "Sensor #42 possui apenas 15% de bateria restante",
      type: "warning",
    },
    {
      title: "Anomalia nos dados",
      message: "Temperatura fora do padrão normal detectada",
      type: "warning",
    },
  ],
  info: [
    {
      title: "Relatório disponível",
      message: "Seu relatório mensal está pronto para download",
      type: "info",
    },
    {
      title: "Manutenção programada",
      message: "Atualizações disponíveis. Reinicie a aplicação para instalar",
      type: "info",
    },
    {
      title: "Novo insumo em estoque",
      message: "Recebimento de fertilizante registrado",
      type: "info",
    },
  ],
};

// Função para gerar notificações aleatórias
export function getRandomNotification() {
  const allNotifications = [
    ...mockNotifications.success,
    ...mockNotifications.error,
    ...mockNotifications.warning,
    ...mockNotifications.info,
  ];
  return allNotifications[Math.floor(Math.random() * allNotifications.length)];
}

// Função para gerar uma notificação de tipo específico
export function getNotificationByType(type) {
  const notifications = mockNotifications[type] || mockNotifications.info;
  return notifications[Math.floor(Math.random() * notifications.length)];
}

// Proxy CORS para consultar detalles de tickets
// URL original: https://back-back9.realvirtual.com.mx/api/client/orders?or_idEmpresa=17&or_idordenExt={ticketId}&details=true

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Método no permitido',
      message: 'Solo se permiten requests GET' 
    });
  }

  try {
    // Extraer ticketId de los query parameters
    const { ticketId } = req.query;

    if (!ticketId) {
      return res.status(400).json({
        error: 'Parámetro faltante',
        message: 'Se requiere el parámetro ticketId'
      });
    }

    console.log('🎫 Consultando ticket:', ticketId);

    // Construir URL de la API original
    const apiUrl = `https://back-back9.realvirtual.com.mx/api/client/orders?or_idEmpresa=17&or_idordenExt=${ticketId}&details=true`;
    
    console.log('🔗 URL API:', apiUrl);

    // Hacer request a la API original
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Proxy-Ticket-B9/1.0'
      }
    });

    if (!response.ok) {
      console.error('❌ Error API:', response.status, response.statusText);
      return res.status(response.status).json({
        error: 'Error en API original',
        status: response.status,
        message: response.statusText,
        ticketId: ticketId
      });
    }

    // Obtener datos de la respuesta
    const data = await response.json();
    
    console.log('✅ Datos obtenidos exitosamente para ticket:', ticketId);
    console.log('📊 Órdenes encontradas:', data.orders?.length || 0);

    // Retornar exactamente los mismos datos de la API original
    res.status(200).json(data);

  } catch (error) {
    console.error('❌ Error en proxy:', error);
    
    return res.status(500).json({
      error: 'Error interno del proxy',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
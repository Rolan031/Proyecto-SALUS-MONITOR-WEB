export class PatientController {
  constructor(createPatientUseCase) {
    this.createPatient = createPatientUseCase;
  }
  
  async handleCreate(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      
      // Validar que los campos requeridos estén presentes
      const { nombre, edad, genero } = req.body;
      
      if (!nombre || !edad || !genero) {
        return res.status(400).json({ 
          error: "Todos los campos son requeridos: nombre, edad, genero",
          received: req.body 
        });
      }
      
      // Convertir edad a número si es string
      const patientData = {
        ...req.body,
        edad: typeof edad === 'string' ? parseInt(edad, 10) : edad
      };
      
      console.log('Datos procesados:', patientData);
      
      const patient = await this.createPatient.execute(patientData);
      res.status(201).json(patient);
    } catch (error) {
      console.error('Error en PatientController:', error);
      res.status(400).json({ 
        error: error.message,
        details: error.stack 
      });
    }
  }
}

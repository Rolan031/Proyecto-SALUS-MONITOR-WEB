Documentacion para uso de Git
link para descargar git: https://git-scm.com/downloads/win
nota: revisar estas diapositivas primero para chequear detalles de instalacion y comandos: https://docs.google.com/presentation/d/1bVQq0Qbxo7_acY9dL6ojBehsD8xEWR8pL6mMulhqetc/edit?slide=id.g362dd58f93d_0_29#slide=id.g362dd58f93d_0_29
Comandos para compartir repositorio
Para clonar: git clone https://github.com/Roland31/Proyecto-SALUS-MONITOR-WEB.git
Para cambiarse a su rama: git checkout rama-[su-nombre]
Para verificar en qué rama están: git branch
Para actualizar su rama personal: git pull origin mi-rama
Ejemplo: Si Anthony está en rama-anthony, ejecuta: git pull origin rama-anthony
Para subir cambios a su rama: git push origin mi-rama
// LO SIGUIENTE LEANLO A DETALLE, ES IMPORTANTE PARA EMPEZAR A TRABAJAR BIEN CON GIT MUCHACHOS
🎓 EXPLICACIÓN PARA TUS COMPAÑEROS
¿Por qué hacer git pull origin main?
Porque cuando tú (administrador) haces merge de otros compañeros a main, ellos necesitan esos cambios en sus ramas para no quedarse atrás.
¿Cuándo hacer git pull origin main?

Al inicio de cada día de trabajo
Cuando reciban un mensaje de que main fue actualizada
Antes de crear una funcionalidad nueva

¿Qué pasa si no lo hacen?

Sus ramas se quedarán desactualizadas
Habrá más conflictos al hacer merge(Yo hago el merge)
Pueden trabajar sobre código obsoleto.

Chicos, estos son los comandos que deben usar diariamente. Lo más importante es que siempre hagan git pull origin main antes de empezar a trabajar,
para tener los cambios más recientes del proyecto. Y recuerden que cada uno trabaja SOLO en su rama asignada.

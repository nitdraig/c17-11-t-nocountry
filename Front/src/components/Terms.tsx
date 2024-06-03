import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Terms() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent">
        Términos y condiciones
      </Button>
      <Modal
        size={"lg"}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        backdrop="opaque"
        onOpenChange={onOpenChange}
        isDismissable={true}
        isKeyboardDismissDisabled={true}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Términos y Condiciones de Mascocuidado
              </ModalHeader>
              <ModalBody>
                <p>
                  <span className="font-bold">¡Bienvenido a Mascocuidado!</span>
                  <br />
                  Te agradecemos por elegir nuestra plataforma para el cuidado
                  integral de tus mascotas. Antes de comenzar a utilizar
                  nuestros servicios, es importante que leas y comprendas
                  nuestros términos y condiciones detallados a continuación:
                </p>
                <p>
                  <span className="font-bold">
                    - Aceptación de los Términos y Condiciones:
                  </span>
                  Al acceder y utilizar los servicios ofrecidos por
                  Mascocuidado, aceptas cumplir con todos los términos y
                  condiciones establecidos en este documento, así como con
                  nuestras políticas de privacidad y cualquier otro documento
                  vinculado. Si no estás de acuerdo con alguno de estos
                  términos, te pedimos que no utilices nuestros servicios.
                  <br />
                  <span className="font-bold">- Descripción del Servicio:</span>
                  Mascocuidado es una plataforma en línea que ofrece una
                  variedad de servicios para el cuidado integral de mascotas.
                  Estos servicios pueden incluir, entre otros, cuidado
                  veterinario, servicios de alojamiento, paseos y cuidado
                  diario. Nos esforzamos por proporcionar servicios de alta
                  calidad que garanticen el bienestar y la felicidad de tus
                  mascotas. <br />
                  <span className="font-bold">- Registro de Usuarios:</span>Para
                  utilizar nuestros servicios, es posible que debas registrarte
                  como usuario en nuestra plataforma. Debes proporcionar
                  información precisa y actualizada durante el proceso de
                  registro, y eres responsable de mantener la confidencialidad
                  de tu cuenta y contraseña. Nos reservamos el derecho de
                  suspender o cancelar tu cuenta si creemos que has
                  proporcionado información falsa o incumplido nuestros términos
                  y condiciones. <br />
                  <span className="font-bold">
                    - Responsabilidades del Usuario:
                  </span>
                  Al utilizar nuestros servicios, aceptas ser el único
                  responsable de tus acciones y del bienestar de tus mascotas.
                  Debes garantizar que tus mascotas estén adecuadamente
                  vacunadas, sean amigables con otros animales y personas, y no
                  representen ningún riesgo para la salud o seguridad de
                  terceros. <br />
                  <span className="font-bold">
                    - Responsabilidades de Mascocuidado:
                  </span>
                  Nos comprometemos a proporcionar servicios de alta calidad y a
                  garantizar la seguridad y el bienestar de tus mascotas
                  mientras estén bajo nuestra custodia. Sin embargo, no nos
                  hacemos responsables de cualquier daño o lesión que pueda
                  ocurrir durante la prestación de nuestros servicios, a menos
                  que sea causado por nuestra negligencia demostrable. <br />{" "}
                  <span className="font-bold"> - Cancelación y Reembolso:</span>{" "}
                  En caso de que necesites cancelar un servicio reservado, te
                  pedimos que lo hagas con la mayor antelación posible. Los
                  reembolsos están sujetos a nuestras políticas de cancelación y
                  pueden variar según el tipo de servicio y el tiempo de
                  anticipación con el que se cancele la reserva. <br />{" "}
                  <span className="font-bold">
                    -Derechos de Propiedad Intelectual:
                  </span>{" "}
                  Todos los derechos de propiedad intelectual relacionados con
                  nuestra plataforma y servicios, incluidos, entre otros, los
                  derechos de autor, marcas comerciales y patentes, son
                  propiedad exclusiva de Mascocuidado. No está permitido
                  utilizar, reproducir o distribuir ningún contenido de nuestra
                  plataforma sin nuestro consentimiento expreso por escrito.{" "}
                  <br />{" "}
                  <span className="font-bold">
                    - Modificaciones de los Términos y Condiciones:
                  </span>{" "}
                  Nos reservamos el derecho de modificar estos términos y
                  condiciones en cualquier momento, sin previo aviso. Te
                  recomendamos que revises regularmente esta sección para estar
                  al tanto de cualquier cambio. El uso continuado de nuestros
                  servicios después de la publicación de cambios constituirá tu
                  aceptación de dichos cambios.
                </p>
                <p className="font-thin">
                  Al utilizar los servicios de Mascocuidado, reconoces haber
                  leído, comprendido y aceptado estos términos y condiciones en
                  su totalidad. Si tienes alguna pregunta o inquietud con
                  respecto a estos términos, no dudes en contactarnos. ¡Gracias
                  por confiar en nosotros para el cuidado de tus queridas
                  mascotas!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

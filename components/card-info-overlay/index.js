import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import CardInfo from "./card-info";
import OverlayFooter from "./overlay-footer";

export default function CardInfoOverlay({
  header,
  gap,
  isOpen,
  onClose,
  buy,
  name,
  attr,
  img,
  id,
  getCardData,
  own,
  reset,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["full", "xl"]} isCentered>
      <ModalOverlay>
        <ModalContent rounded="lg" m={[0, "16px"]} zIndex={2}>
          <ModalHeader textTransform="capitalize">{header}</ModalHeader>

          <ModalCloseButton size="lg" top="11px" rounded="lg" />

          <ModalBody>
            <CardInfo
              onClose={onClose}
              gap={gap}
              buy={buy}
              name={name}
              img={img}
              attr={attr}
              id={id}
              getCardData={getCardData}
              own={own}
              reset={reset}
            />
          </ModalBody>

          <ModalFooter>
            <OverlayFooter
              base={!buy ? "initial" : "flex"}
              md="none"
              onClose={onClose}
              gap={gap}
              buy={buy}
              id={id}
              getCardData={getCardData}
              own={own}
              reset={reset}
            />
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

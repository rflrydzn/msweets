import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Row,
  Column,
  Img,
  Hr,
} from "@react-email/components";
import { BillingInfo, CartItem } from "@/lib/types/types";

interface OrderEmailProps {
  items: CartItem[];
  customerName?: string;
  orderDate?: string;
  billingInfo: BillingInfo;
}

export const OrderEmail = ({
  items,
  customerName = "Customer",
  orderDate = new Date().toLocaleDateString(),
  billingInfo,
}: OrderEmailProps) => {
  const selectedItems = items.filter((i) => i.selected);
  const subtotal = selectedItems.reduce(
    (sum, i) => sum + i.option.price * i.quantity,
    0,
  );
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <Html lang="en">
      <Head />
      <Body
        style={{
          backgroundColor: "#f9f9f9",
          fontFamily: "sans-serif",
          margin: 0,
        }}
      >
        <Container
          style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 24px" }}
        >
          {/* Header */}
          <Heading
            style={{ fontSize: "24px", color: "#1a1a1a", marginBottom: "4px" }}
          >
            New Order Received
          </Heading>
          <Text style={{ color: "#777", marginTop: 0 }}>
            Order from <strong>{customerName}</strong> on {orderDate}
          </Text>

          <Hr style={{ borderColor: "#f0d6c8", margin: "16px 0" }} />

          {/* Order Items */}
          <Heading
            style={{ fontSize: "16px", color: "#1a1a1a", marginBottom: "12px" }}
          >
            Items Ordered
          </Heading>

          {selectedItems.map((item) => (
            <Section key={item.id} style={{ marginBottom: "16px" }}>
              <Row>
                <Column style={{ width: "72px", verticalAlign: "top" }}>
                  <Img
                    src={item.image_url}
                    width="60"
                    height="60"
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                </Column>
                <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                  <Text
                    style={{
                      margin: 0,
                      fontWeight: "600",
                      color: "#1a1a1a",
                      fontSize: "14px",
                    }}
                  >
                    {item.name.trim()}
                  </Text>
                  <Text style={{ margin: 0, fontSize: "13px", color: "#888" }}>
                    {item.option.label.trim()} × {item.quantity}
                  </Text>
                </Column>
                <Column style={{ textAlign: "right", verticalAlign: "top" }}>
                  <Text
                    style={{
                      margin: 0,
                      fontWeight: "600",
                      color: "#1a1a1a",
                      fontSize: "14px",
                    }}
                  >
                    ₱{(item.option.price * item.quantity).toLocaleString()}
                  </Text>
                  <Text style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>
                    ₱{item.option.price.toLocaleString()} each
                  </Text>
                </Column>
              </Row>
            </Section>
          ))}

          <Hr style={{ borderColor: "#f0d6c8", margin: "16px 0" }} />

          {/* Totals */}
          <Row>
            <Column>
              <Text
                style={{ margin: "4px 0", color: "#777", fontSize: "14px" }}
              >
                Subtotal
              </Text>
            </Column>
            <Column style={{ textAlign: "right" }}>
              <Text
                style={{ margin: "4px 0", color: "#777", fontSize: "14px" }}
              >
                ₱
                {subtotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text
                style={{ margin: "4px 0", color: "#777", fontSize: "14px" }}
              >
                Tax (12%)
              </Text>
            </Column>
            <Column style={{ textAlign: "right" }}>
              <Text
                style={{ margin: "4px 0", color: "#777", fontSize: "14px" }}
              >
                ₱{tax.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text
                style={{
                  margin: "8px 0 0",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#1a1a1a",
                }}
              >
                Total
              </Text>
            </Column>
            <Column style={{ textAlign: "right" }}>
              <Text
                style={{
                  margin: "8px 0 0",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#c0392b",
                }}
              >
                ₱{total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </Text>
            </Column>
          </Row>

          <Hr style={{ borderColor: "#f0d6c8", margin: "24px 0 16px" }} />

          {/* Customer Details */}
          <Heading
            style={{ fontSize: "16px", color: "#1a1a1a", marginBottom: "12px" }}
          >
            Customer Details
          </Heading>

          <Row>
            <Column style={{ width: "130px" }}>
              <Text
                style={{ margin: "4px 0", color: "#888", fontSize: "13px" }}
              >
                Name
              </Text>
            </Column>
            <Column>
              <Text
                style={{ margin: "4px 0", color: "#1a1a1a", fontSize: "13px" }}
              >
                {billingInfo.name} {billingInfo.surname}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column style={{ width: "130px" }}>
              <Text
                style={{ margin: "4px 0", color: "#888", fontSize: "13px" }}
              >
                Email
              </Text>
            </Column>
            <Column>
              <Text
                style={{ margin: "4px 0", color: "#1a1a1a", fontSize: "13px" }}
              >
                {billingInfo.email}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column style={{ width: "130px" }}>
              <Text
                style={{ margin: "4px 0", color: "#888", fontSize: "13px" }}
              >
                Phone
              </Text>
            </Column>
            <Column>
              <Text
                style={{ margin: "4px 0", color: "#1a1a1a", fontSize: "13px" }}
              >
                {billingInfo.phoneNumber}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column style={{ width: "130px" }}>
              <Text
                style={{ margin: "4px 0", color: "#888", fontSize: "13px" }}
              >
                Address
              </Text>
            </Column>
            <Column>
              <Text
                style={{ margin: "4px 0", color: "#1a1a1a", fontSize: "13px" }}
              >
                {billingInfo.address}, {billingInfo.city},{" "}
                {billingInfo.province}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column style={{ width: "130px" }}>
              <Text
                style={{ margin: "4px 0", color: "#888", fontSize: "13px" }}
              >
                Payment
              </Text>
            </Column>
            <Column>
              <Text
                style={{ margin: "4px 0", color: "#1a1a1a", fontSize: "13px" }}
              >
                {billingInfo.paymentMethod}
              </Text>
            </Column>
          </Row>

          {billingInfo.comment && (
            <>
              <Hr style={{ borderColor: "#f0d6c8", margin: "16px 0" }} />
              <Heading
                style={{
                  fontSize: "16px",
                  color: "#1a1a1a",
                  marginBottom: "8px",
                }}
              >
                Customer Note
              </Heading>
              <Text
                style={{ color: "#555", fontSize: "14px", fontStyle: "italic" }}
              >
                "{billingInfo.comment}"
              </Text>
            </>
          )}

          <Hr style={{ borderColor: "#f0d6c8", margin: "24px 0 16px" }} />
          <Text
            style={{ color: "#aaa", fontSize: "12px", textAlign: "center" }}
          >
            This is an automated order notification.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

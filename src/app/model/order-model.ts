import { OrderStatus } from "../enum/order-status.enum"
import { Transmission } from "../enum/transmission.enum"
import { VehicleBrand } from "../enum/vehicle-brand.enum"
import { VehicleType } from "../enum/vehicle-type.enum"
import { PaymentStatus } from "../enum/payment-status.enum"

export class OrderHistoryResponseModel {
    public id = 0
    public customerName = ''
    public productName = ''
    public duration = 0
    public vehicleType = VehicleType.CAR
    public transmission = Transmission.MATIC
    public brand = VehicleBrand.BYD
    public totalPayment = 0
    public startAt = new Date()
    public endAt = new Date()
    public orderStatus = OrderStatus.WAITING_PAYMENT
    public paymentStatus = PaymentStatus.WAITING
    public orderedAt = new Date()

    getPaymentStatusColor(): string {
        if (this.paymentStatus === PaymentStatus.PAID) {
            return 'success'
        } else if (this.paymentStatus === PaymentStatus.REFUNDED
            || this.paymentStatus === PaymentStatus.FAILED 
            || this.paymentStatus === PaymentStatus.CANCELED) {
            return 'danger'
        } else if (this.paymentStatus === PaymentStatus.PARTIALLY_PAID) {
            return 'warning'
        }

        return 'secondary'
    }
}

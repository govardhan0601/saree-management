from django.db import models

# ✅ Saree Model
class Saree(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        app_label = "core"  # ✅ Ensure Django recognizes the app
        verbose_name_plural = "Sarees"  # ✅ Display in Django Admin

    def __str__(self):
        return f"{self.name} - ₹{self.price}"


# ✅ Raw Material Model
class RawMaterial(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)  # ✅ Added price per unit

    class Meta:
        app_label = "core"
        verbose_name_plural = "Raw Materials"

    def __str__(self):
        return self.name


# ✅ Transaction Model
class Transaction(models.Model):
    date = models.DateField()  # ✅ Allow user to select the date
    saree = models.ForeignKey(Saree, on_delete=models.CASCADE, null=True, blank=True)
    raw_material = models.ForeignKey(RawMaterial, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1.0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    class Meta:
        app_label = "core"
        verbose_name_plural = "Transactions"

    def save(self, *args, **kwargs):
        # ✅ If the transaction is for a Saree
        if self.saree:
            self.total_price = self.saree.price * self.quantity

        # ✅ If the transaction is for Raw Material
        elif self.raw_material:
            self.total_price = self.raw_material.price_per_unit * self.quantity

        super(Transaction, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.date} - {self.saree or self.raw_material} - ₹{self.total_price}"
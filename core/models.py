from django.db import models

from django.db import models

class Saree(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        app_label = "core"  # 🔥 Add This Line If Needed
class RawMaterial(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    date = models.DateField()
    saree = models.ForeignKey(Saree, on_delete=models.CASCADE, null=True, blank=True)
    raw_material = models.ForeignKey(RawMaterial, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1.0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def save(self, *args, **kwargs):
        if self.saree:
            self.total_price = self.saree.price * self.quantity
        super(Transaction, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.date} - {self.saree or self.raw_material} - {self.total_price}"
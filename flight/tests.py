from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import *

class ViewsTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.User = get_user_model()
        self.user = self.User.objects.create_user(username='testuser', password='testpassword')

    def test_index_get(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
        self.assertIn('min_date', response.context)
        self.assertIn('max_date', response.context)

    def test_index_post_trip_type_1(self):
        response = self.client.post(reverse('index'), {
            'Origin': 'A',
            'Destination': 'B',
            'DepartDate': '2024-09-01',
            'SeatClass': 'Economy',
            'TripType': '1'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
        self.assertEqual(response.context['origin'], 'A')
        self.assertEqual(response.context['destination'], 'B')
        self.assertEqual(response.context['depart_date'], '2024-09-01')
        self.assertEqual(response.context['seat'], 'economy')
        self.assertEqual(response.context['trip_type'], '1')

    def test_index_post_trip_type_2(self):
        response = self.client.post(reverse('index'), {
            'Origin': 'A',
            'Destination': 'B',
            'DepartDate': '2024-09-01',
            'SeatClass': 'Economy',
            'TripType': '2',
            'ReturnDate': '2024-09-10'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
        self.assertEqual(response.context['origin'], 'A')
        self.assertEqual(response.context['destination'], 'B')
        self.assertEqual(response.context['depart_date'], '2024-09-01')
        self.assertEqual(response.context['seat'], 'economy')
        self.assertEqual(response.context['trip_type'], '2')
        self.assertEqual(response.context['return_date'], '2024-09-10')

    def test_login_view_get(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'login.html')

    def test_login_view_post_valid(self):
        response = self.client.post(reverse('login'), {
            'username': 'testuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('index'))

    def test_login_view_post_invalid(self):
        response = self.client.post(reverse('login'), {
            'username': 'testuser',
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'login.html')
        self.assertContains(response, "Invalid username and/or password.")

    def test_register_view_get(self):
        response = self.client.get(reverse('register'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'register.html')

    def test_register_view_post_missing_fields(self):
        response = self.client.post(reverse('register'), {
            'firstname': '',
            'lastname': '',
            'username': '',
            'email': '',
            'password': 'password',
            'confirmation': 'password'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'register.html')
        self.assertContains(response, "All fields are required.")

    def test_register_view_post_password_mismatch(self):
        response = self.client.post(reverse('register'), {
            'firstname': 'Test',
            'lastname': 'User',
            'username': 'testuser2',
            'email': 'test2@example.com',
            'password': 'password',
            'confirmation': 'differentpassword'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'register.html')
        self.assertContains(response, "Passwords must match.")

    def test_register_view_post_valid(self):
        response = self.client.post(reverse('register'), {
            'firstname': 'Test',
            'lastname': 'User',
            'username': 'testuser2',
            'email': 'test2@example.com',
            'password': 'password',
            'confirmation': 'password'
        })
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('index'))
        self.assertTrue(self.User.objects.filter(username='testuser2').exists())

    def test_logout_view(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.get(reverse('logout'))
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('index'))
    
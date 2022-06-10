-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2022 at 05:35 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wabot`
--

-- --------------------------------------------------------

--
-- Table structure for table `botcontacts`
--

CREATE TABLE `botcontacts` (
  `id` int(11) NOT NULL,
  `id_bot` int(11) NOT NULL,
  `id_sales` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `botcontacts`
--

INSERT INTO `botcontacts` (`id`, `id_bot`, `id_sales`, `createdAt`, `updatedAt`) VALUES
(22, 208, 6, '2022-05-31 06:18:19', '2022-05-31 06:18:19'),
(23, 210, 7, '2022-05-31 06:25:02', '2022-05-31 06:25:02'),
(24, 213, 8, '2022-05-31 06:41:04', '2022-05-31 06:41:04'),
(25, 215, 9, '2022-05-31 06:43:58', '2022-05-31 06:43:58'),
(26, 219, 10, '2022-05-31 06:49:40', '2022-05-31 06:49:40'),
(27, 221, 11, '2022-05-31 06:52:45', '2022-05-31 06:52:45'),
(28, 223, 12, '2022-05-31 06:55:13', '2022-05-31 06:55:13'),
(29, 225, 7, '2022-05-31 06:57:06', '2022-05-31 06:57:06'),
(30, 227, 13, '2022-05-31 07:06:03', '2022-05-31 07:06:03'),
(31, 229, 13, '2022-05-31 07:08:02', '2022-05-31 07:08:02'),
(32, 231, 14, '2022-05-31 07:22:08', '2022-05-31 07:22:08'),
(33, 233, 15, '2022-05-31 07:24:08', '2022-05-31 07:24:08'),
(34, 235, 15, '2022-05-31 07:25:54', '2022-05-31 07:25:54'),
(35, 237, 16, '2022-05-31 07:56:36', '2022-05-31 07:56:36'),
(37, 241, 18, '2022-05-31 08:03:43', '2022-05-31 08:03:43'),
(38, 243, 17, '2022-05-31 08:05:04', '2022-05-31 08:05:04'),
(39, 245, 18, '2022-05-31 08:06:25', '2022-05-31 08:06:25'),
(40, 249, 18, '2022-05-31 08:11:47', '2022-05-31 08:11:47'),
(41, 251, 19, '2022-05-31 08:13:19', '2022-05-31 08:13:19'),
(42, 253, 20, '2022-05-31 08:18:08', '2022-05-31 08:18:08'),
(43, 255, 20, '2022-05-31 08:19:53', '2022-05-31 08:19:53'),
(44, 259, 13, '2022-05-31 08:29:34', '2022-05-31 08:29:34'),
(45, 261, 19, '2022-05-31 08:31:09', '2022-05-31 08:31:09'),
(46, 266, 18, '2022-05-31 08:39:38', '2022-05-31 08:39:38'),
(47, 268, 13, '2022-05-31 08:41:51', '2022-05-31 08:41:51'),
(48, 271, 19, '2022-05-31 08:46:01', '2022-05-31 08:46:01'),
(49, 275, 19, '2022-05-31 08:51:33', '2022-05-31 08:51:33'),
(51, 278, 18, '2022-05-31 08:57:47', '2022-05-31 08:57:47'),
(52, 280, 21, '2022-05-31 09:00:00', '2022-05-31 09:00:00'),
(53, 282, 19, '2022-05-31 09:02:26', '2022-05-31 09:02:26'),
(54, 284, 19, '2022-05-31 09:16:27', '2022-05-31 09:16:27');

-- --------------------------------------------------------

--
-- Table structure for table `bots`
--

CREATE TABLE `bots` (
  `id` int(11) NOT NULL,
  `id_key` int(11) NOT NULL,
  `id_menuAktif` int(11) NOT NULL,
  `id_prevKey` int(11) NOT NULL,
  `id_prevMenu` int(11) NOT NULL,
  `id_afterMenu` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `interest` text DEFAULT NULL,
  `forward` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bots`
--

INSERT INTO `bots` (`id`, `id_key`, `id_menuAktif`, `id_prevKey`, `id_prevMenu`, `id_afterMenu`, `message`, `interest`, `forward`, `status`, `createdAt`, `updatedAt`) VALUES
(121, 12, 1, 20, 23, 24, 'Pilih salah satu menu dibawah ini untuk melakukan pemesanan\n\n1 Staples\n2 Aksesoris\n3 Hard padding / Glasswool\n4 Plastik\n5 Kawat & Per Coil\n6 Kain Springbed & Sofa\n7 Non Woven\n8 Pita List Bisban\n9 Busa & Kimia\n10 Other\n11 Aksesoris Gorden\n12 Jasa\n99 Alt Menu\n0 Menu Sebelumnya\n\npilih salah satu, contoh : *1*\nsilahkan ketik *.home* untuk kembali ke *Menu utama*', '', 0, 1, '2022-05-30 06:14:57', '2022-05-30 06:14:57'),
(122, 14, 24, 14, 1, 1, '', '', 1, 1, '2022-05-30 06:16:04', '2022-05-30 06:16:04'),
(123, 12, 24, 20, 23, 34, 'Staples\r\n\r\nIsi staples ini berguna untuk merekatkan atau menggabungkan kedua bahan/barang atau lebih dengan bahan lainnya\r\nBerikut jenis-jenis staples yang tersedia :\r\n\r\n> Staples 416 - 422 J        \r\n> Staples HR 22\r\n> Staples 13/6 & 13/8        \r\n> Staples 619\r\n> Staples C-Ring             \r\n> Staples 1006 - 1022 J\r\n> Staples CL 73/74/75/76\r\n\r\n\r\nUntuk info lebih lanjut silahkan pilih\r\n1 Menghubungi Sales\r\n0 Info Produk lainnya\r\n99 Alt Menu', 'Staples', 0, 1, '2022-05-30 06:18:17', '2022-05-30 06:18:17'),
(124, 14, 34, 12, 1, 24, '', '', 1, 1, '2022-05-30 06:19:31', '2022-05-30 06:19:31'),
(127, 14, 35, 12, 1, 24, '', '', 1, 1, '2022-05-30 06:26:33', '2022-05-30 06:26:33'),
(128, 13, 24, 20, 23, 35, 'Aksesoris\n\nMerupakan bahan pendukung dan pemanis yang digunakan dalam proses akhir pembuatan springbed/sofa.\nSelain akan menambahkan sisi keindahan, beberapa aksesoris pun mempunyai peran penting dalam pembuatan springbed dan sofa.\nBerikut jenis-jenis aksesoris yang tersedia :\n\n> Kaki Stabil Sofa/Springbed\n> Plat Ring / Siku / Sandaran / Rotaring\n> Baut Sakura\n> Engsel\n> Lobang Angin Springbed\n> Plastik Sudut\n> Paku & Kancing\n> Tali kur\n> Rumbai Bantal\n> Tasel Gantung\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Accessories', 0, 1, '2022-05-30 06:27:59', '2022-05-30 06:27:59'),
(129, 16, 24, 20, 23, 36, 'Hard Padding / Glasswool\n\nMerupakan bahan pelapis pada pembuatan springbed/sofa, selain untuk melindungi bahan ini juga berfungsi sebagai bahan peredam suara. Jenisnya :\n\n> Cotton Sheet Soft\n> Cotton Sheet Hard\n> Hard Padding\n> Maliwat\n\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Hard Padding / Glasswool', 0, 1, '2022-05-30 06:37:52', '2022-05-30 06:37:52'),
(132, 14, 36, 12, 1, 24, '', '', 1, 1, '2022-05-30 06:41:28', '2022-05-30 06:41:28'),
(133, 19, 24, 20, 23, 37, 'Plastik\n\nMerupakan beberapa bahan baku yang terbuat dari plastik dan memiliki fungsi penting dalam pembuatan ataupun packing springbed dan sofa.\n\n> (Pe) Poly Foam Enchasment         \n> Plastik Mika\n> (Pe) Poly Foam Sheet & Roll         \n> PP Board\n> (Pe) Poly Foam Tube                     \n> Bagor\n> Plastik Pe Roll                                \n> Lakban\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Plastic', 0, 1, '2022-05-30 06:43:44', '2022-05-30 06:43:44'),
(134, 14, 37, 12, 1, 24, '', '', 1, 1, '2022-05-30 06:44:50', '2022-05-30 06:44:50'),
(135, 21, 24, 20, 23, 38, 'Kawat & Per Coil\n\nMerupakan material utama dalam pembuatan per coil atau per pegas\n\n> Kawat Ulir 1,4 / 1,6 MM\n> Kawat 2,2 / 2,24 / 2,4 / 3,5 MM\n> Kawat Blowing 4,0 / 4,2 / 5,0 MM\n> Per Ulir\n> Kawat M / Z / Corner Guard\n> Per Sofa / Per Coil\n> Per Pocket\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Kawat & Per Coil', 0, 1, '2022-05-30 06:46:45', '2022-05-30 06:46:45'),
(136, 14, 38, 12, 1, 24, '', '', 1, 1, '2022-05-30 06:47:25', '2022-05-30 06:47:25'),
(137, 22, 24, 20, 23, 39, 'Kain Springbed & Sofa\n\nMerupakan bahan pelapis yang memberikan keindahan/estetika dan kenyamanan yang melindungi Sofa dari debu dan kotoran.\n\n> Kain Imitasi\n> Kain Sofa Beludru\n> Kain Katun Cina / Polyester TC\n> Kain Disperse\n> Kain Jakat\n> Kain Knitting\n> Kain Quilting\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Kain Springbed & Sofa', 0, 1, '2022-05-30 06:49:04', '2022-05-30 06:49:04'),
(138, 14, 39, 12, 1, 24, '', '', 1, 1, '2022-05-30 06:49:30', '2022-05-30 06:49:30'),
(139, 23, 24, 20, 23, 40, 'Non Woven / Spunbond\n\nBahan yang menyerupai kain terbuat dari serat strapel dan serat panjang lalu diikat dengan proses kimia, panas dan mekanik.\nJenis nya dibedakan berdasarkan warna dan gramasi nya :\n\n> Hitam / Putih / Abu / Warna Lain\n> 15 / 30 / 35 / 40 / 45 / 50 / 70 / 75 / 100 / 125 gsm\n> Lebar : 13 / 90 / 210 / 220 / 230 cm\n> Panjang : 250 / 500 / 1000 M\n\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Non Woven / Spunbond', 0, 1, '2022-05-30 06:50:59', '2022-05-30 06:50:59'),
(140, 14, 40, 12, 1, 24, '', '', 1, 1, '2022-05-30 06:51:24', '2022-05-30 06:51:24'),
(141, 29, 24, 20, 23, 41, 'Pita List Bisban / Webbing\n\nBisban atau bias tape, merupakan kain kecil yang digunakan sebagai penutup pinggiran kain agar tampak manis dan rapi.\nJenis :\n\n> List dengan berbagai Motif\n> List Webbing\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Pita List Bisban / Webbing', 0, 1, '2022-05-30 07:28:02', '2022-05-30 07:28:02'),
(142, 14, 41, 12, 1, 24, '', '', 1, 1, '2022-05-30 07:28:29', '2022-05-30 07:28:29'),
(143, 30, 24, 20, 23, 42, 'Busa & Kimia\nKami menyediakan busa jadi dan bahan baku (kimia) pembuatan busa\n\n> Busa Latex (lembaran)\n> Busa Angin\n> Busa Rebonded\n> Kimia TDI / T9 / PPG / POP / MC\n> Calcium\n> Pewarna\n> Silicone Oil\n\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Busa & Kimia', 0, 1, '2022-05-30 07:29:43', '2022-05-30 07:29:43'),
(144, 14, 42, 12, 1, 24, '', '', 1, 1, '2022-05-30 07:30:04', '2022-05-30 07:30:04'),
(145, 31, 24, 20, 23, 43, 'Other\n\nKami juga menyediakan bahan-bahan lainnya seperti :\n\n> Lem Kuning / Spray / Inseal / Latex\n> Benang Nylon / Jahit List / Quilting\n> Sarung tangan\n> Karet Ban\n> PVC Net\n> Kursi Susun\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Other', 0, 1, '2022-05-30 07:31:11', '2022-05-30 07:31:11'),
(146, 14, 43, 12, 1, 24, '', '', 1, 1, '2022-05-30 07:31:33', '2022-05-30 07:31:33'),
(147, 32, 24, 20, 23, 44, 'Aksesoris Gorden\n\nKami menyediakan juga beberapa aksesoris untuk mempercantik gorden di rumah anda :\n\n> Tasel / Tali Gorden / Ikat Gorden\n> Hook / Pengait Gorden\n> Smook Ring\n> End Cup Rel Gorden\n\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Aksesoris Gorden', 0, 1, '2022-05-30 07:32:53', '2022-05-30 07:32:53'),
(148, 14, 44, 12, 1, 24, '', '', 1, 1, '2022-05-30 07:33:13', '2022-05-30 07:33:13'),
(149, 33, 24, 20, 23, 45, 'Jasa\n\n> Jasa Quilting (khusus Matrass/Springbed)\n> Jasa Pembuatan Per Coil\n> Jasa Pembuatan Per Rakit\n\nUntuk info lebih lanjut silahkan pilih\n1 Menghubungi Sales\n0 Info Produk lainnya\n99 Alt Menu', 'Jasa', 0, 1, '2022-05-30 07:34:26', '2022-05-30 07:34:26'),
(150, 14, 45, 12, 1, 24, '', '', 1, 1, '2022-05-30 07:34:50', '2022-05-30 07:34:50'),
(151, 13, 1, 20, 23, 25, 'Kantor Cabang manakah yang kaka ingin lihat :\n \n 1 Bogor\n 2 Surabaya\n 3 Semarang\n 4 Manado\n 5 Makassar\n 6 Samarinda\n 7 Pekanbaru\n \n pilih salah satu, contoh : *1*\n ketik *.home* untuk kembali ke *Menu Utama*', '', 0, 1, '2022-05-30 07:37:13', '2022-05-30 07:37:13'),
(152, 12, 25, 20, 23, 26, 'Kantor Vika di Bogor\n \nJl. Pahlawan No.29A, RT.003/RW005, Sanja, Kec. Citeureup, Kabupaten Bogor, Jawa Barat 16810\nhttps://goo.gl/maps/pPFQftzdcaVAZUA67\n \nsilahkan ketik *.home* untuk kembali ke *Menu utama*\nketik *0* untuk info alamat cabang lainnya', '', 0, 1, '2022-05-30 07:38:26', '2022-05-30 07:38:26'),
(153, 14, 26, 13, 1, 25, '', '', 1, 1, '2022-05-30 07:38:43', '2022-05-30 07:38:43'),
(154, 13, 25, 20, 23, 27, 'Kantor Vika di Sidoarjo\n \nJl. Raya Ketimang No.1, Ketimang, Kec. Wonoayu, Kabupaten Sidoarjo, Jawa Timur 61261\nhttps://goo.gl/maps/NhQeNESEnFVA5sb38\n \nsilahkan ketik *.home* untuk kembali ke *Menu utama*\nketik *0* untuk info alamat cabang lainnya', '', 0, 1, '2022-05-30 07:39:41', '2022-05-30 07:39:41'),
(155, 14, 27, 13, 1, 25, '', '', 1, 1, '2022-05-30 07:40:02', '2022-05-30 07:40:02'),
(156, 16, 25, 20, 23, 28, 'Kantor Vika di Semarang\n \nJl. Gatot Subroto Kawasan Candi Blok 8E No.8 Bambankerep, Kec. Ngaliyan, Kota Semarang, Jawa Tengah 50211\nhttps://goo.gl/maps/ydwugcCm7SJjRkk29\n \nsilahkan ketik *.home* untuk kembali ke *Menu utama*\nketik *0* untuk info alamat cabang lainnya', '', 0, 1, '2022-05-30 07:41:08', '2022-05-30 07:41:08'),
(157, 14, 28, 13, 1, 25, '', '', 1, 1, '2022-05-30 07:41:33', '2022-05-30 07:41:33'),
(158, 19, 25, 20, 23, 29, 'Kantor Vika di Manado\n \nPergudangan Angtropolis C15/D1 (Maumbi)\nKec Kalawat Kab Minahasa Utara, Sulawesi Utara, 95378\nhttps://goo.gl/maps/d7HtHDWqR5bss9qy9\n \nsilahkan ketik *.home* untuk kembali ke *Menu utama*\nketik *0* untuk info alamat cabang lainnya', '', 0, 1, '2022-05-30 07:42:27', '2022-05-30 07:42:27'),
(159, 14, 29, 13, 1, 25, '', '', 1, 1, '2022-05-30 07:42:48', '2022-05-30 07:42:48'),
(160, 21, 25, 20, 23, 30, 'Kantor Vika di Makassar\n \nPergudangan Business Park Blok E2 No.8 Pattene 88\nPabentengang, Kec. Marusu, Kabupaten Maros, Sulawesi Selatan 90552\nhttps://goo.gl/maps/tK76Gc1gMkxQMkWRA\n \nsilahkan ketik *.home* untuk kembali ke *Menu utama*\nketik *0* untuk info alamat cabang lainnya', '', 0, 1, '2022-05-30 07:44:03', '2022-05-30 07:44:03'),
(162, 14, 30, 13, 1, 25, '', '', 1, 1, '2022-05-30 07:46:09', '2022-05-30 07:46:09'),
(163, 22, 25, 20, 23, 31, 'Kantor Vika di Samarinda\n \nJl. P. Suryanata, Samarinda Central Bizpark, Bukit Pinang\nKec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur, 75131\nhttps://goo.gl/maps/V9DqMfvMX83oz7ZA6\n \nsilahkan ketik *.home* untuk kembali ke *Menu utama*\nketik *0* untuk info alamat cabang lainnya', '', 0, 1, '2022-05-30 07:46:48', '2022-05-30 07:46:48'),
(164, 14, 31, 13, 1, 25, '', '', 1, 1, '2022-05-30 07:47:05', '2022-05-30 07:47:05'),
(165, 23, 25, 20, 23, 32, 'Kantor Vika di Pekanbaru\n \nJl. Pasir Putih KM 10 Lintas Timur, Desa Baru\nDesa Baru, Kec Siak Hulu Kab Kampar, Riau, 28452\nhttps://goo.gl/maps/Z9yutwQSEAvWsacx9\n\nsilahkan ketik *.home* untuk kembali ke *Menu utama*\nketik *0* untuk info alamat cabang lainnya', '', 0, 1, '2022-05-30 07:47:44', '2022-05-30 07:47:44'),
(166, 14, 32, 13, 1, 25, '', '', 1, 1, '2022-05-30 07:48:11', '2022-05-30 07:48:11'),
(167, 14, 25, 14, 1, 1, '', '', 1, 1, '2022-05-30 07:49:29', '2022-05-30 07:49:29'),
(168, 34, 33, 20, 23, 46, 'Silahkan pilih alternatif menu cepat dibawah ini 😊\n \n.produk = Untuk melihat produk kami\n.cabang = Untuk melihat cabang kami\n.cs = Untuk menghubungi cs\n#nama = Untuk merubah nama dan kota anda (exp: #vika)\n.home = Untuk kembali ke-menu utama\n\n*Note : Key ini dapat digunakan di dalam menu manapun*\n\n', '', 0, 1, '2022-05-30 08:02:40', '2022-06-03 04:28:15'),
(169, 26, 33, 12, 1, 24, '', '', 1, 1, '2022-05-30 08:05:16', '2022-06-03 03:52:42'),
(170, 27, 33, 13, 1, 25, '', '', 1, 1, '2022-05-30 08:06:35', '2022-05-30 08:06:35'),
(172, 14, 1, 20, 23, 1, 'Halo kak {name} 😊\r\nsilahkan pilih salah satu topik dibawah ini :\r\n\r\n1  Info Produk\r\n2  Info Alamat Kantor\r\n3  Berbicara dengan Customer Service\r\n99 Daftar Menu\r\n\r\npilih salah satu, contoh : *2* (untuk kaka yang ingin mengetahui alamat kantor Vika)', '', 0, 1, '2022-05-30 08:15:44', '2022-05-30 08:15:44'),
(173, 25, 33, 14, 1, 1, '', '', 1, 1, '2022-05-30 08:16:17', '2022-05-30 08:16:17'),
(174, 16, 1, 20, 23, 47, 'Silahkan pilih salah satu daerah yang terdekat dari tempat kaka berada yaaa 😊\r\n \r\n 1 Jawa\r\n 2 Sumatera\r\n 3 Sulawesi\r\n 4 NTT & NTB\r\n 5 Bali\r\n 6 Kalimantan\r\n 7 Maluku\r\n 8 Papua\r\n 0 Menu Sebelumnya', '', 0, 1, '2022-05-30 08:22:54', '2022-05-30 08:22:54'),
(175, 14, 47, 14, 1, 1, '', '', 1, 1, '2022-05-30 08:23:19', '2022-05-30 08:23:19'),
(177, 14, 48, 16, 1, 47, '', '', 1, 1, '2022-05-30 08:36:00', '2022-05-30 08:36:00'),
(178, 13, 47, 20, 23, 49, 'Silahkan pilih salah satu daerah yang terdekat dari tempat kaka berada yaaa 😊\n\nSumatera :\n1 Sumatera Barat\n2 Sumatera Utara & Aceh\n3 Riau\n4 Sumatera Selatan\n5 Jambi / Lampung / Bengkulu\n0 Kembali', '', 0, 1, '2022-05-30 08:37:39', '2022-06-03 04:05:40'),
(179, 14, 49, 16, 1, 47, '', '', 1, 1, '2022-05-30 08:38:02', '2022-05-30 08:38:02'),
(180, 16, 47, 20, 23, 50, 'Silahkan pilih salah satu daerah yang terdekat dari tempat kaka berada yaaa 😊\n\nSulawesi :\n1 Sulawesi Utara\n2 Sulawesi Tengah\n3 Sulawesi Selatan\n4 Sulawesi Tenggara\n5 Sulawesi Barat\n0 Kembali', '', 0, 1, '2022-05-30 08:39:21', '2022-05-30 08:39:21'),
(181, 14, 50, 16, 1, 47, '', '', 1, 1, '2022-05-30 08:39:44', '2022-05-30 08:39:44'),
(182, 22, 47, 20, 23, 51, 'Silahkan pilih salah satu daerah yang terdekat dari tempat kaka berada yaaa 😊\n\nKalimantan :\n1 Kalimantan Barat\n2 Kalimantan Tengah\n3 Kalimantan Selatan\n4 Kalimantan Timur\n0 Kembali', '', 0, 1, '2022-05-30 08:41:30', '2022-05-30 08:41:30'),
(183, 14, 51, 16, 1, 47, '', '', 1, 1, '2022-05-30 08:41:54', '2022-05-30 08:41:54'),
(188, 35, 33, 16, 1, 47, '', '', 1, 1, '2022-05-30 09:20:29', '2022-05-30 09:20:29'),
(191, 14, 53, 12, 47, 48, '', '', 1, 1, '2022-05-30 09:32:36', '2022-05-30 09:32:36'),
(192, 12, 34, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:00:06', '2022-05-31 02:00:06'),
(193, 12, 35, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:00:53', '2022-05-31 02:00:53'),
(194, 12, 44, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:01:16', '2022-05-31 02:01:16'),
(195, 12, 42, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:01:59', '2022-05-31 02:01:59'),
(196, 12, 36, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:02:29', '2022-05-31 02:02:29'),
(197, 12, 45, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:03:34', '2022-05-31 02:03:34'),
(198, 12, 39, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:03:54', '2022-05-31 02:03:54'),
(199, 12, 38, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:04:14', '2022-05-31 02:04:14'),
(200, 12, 40, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:04:36', '2022-05-31 02:04:36'),
(201, 12, 43, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:05:01', '2022-05-31 02:05:01'),
(202, 12, 41, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:05:23', '2022-05-31 02:05:23'),
(203, 12, 37, 16, 1, 47, '', '', 1, 1, '2022-05-31 02:05:51', '2022-05-31 02:05:51'),
(207, 12, 47, 20, 23, 48, 'Silahkan pilih salah satu daerah yang terdekat dari tempat kaka berada yaaa 😊\n\nJawa :\n1 Jabodetabek\n2 Jawa Barat\n3 Jawa Tengah\n4 Jawa Timur\n5 Banten\n0 Kembali', '', 0, 1, '2022-05-31 06:14:03', '2022-05-31 06:14:03'),
(208, 12, 48, 20, 23, 55, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 06:18:19', '2022-05-31 06:18:19'),
(209, 14, 55, 12, 47, 48, '', '', 1, 1, '2022-05-31 06:18:53', '2022-05-31 06:18:53'),
(210, 13, 48, 20, 23, 53, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 06:25:02', '2022-05-31 06:25:02'),
(211, 16, 48, 20, 23, 56, 'Silahkan pilih CS yang ingin dihubungi 😊\r\n \r\n 1 Devita\r\n 2 Linda\r\n 0 Menu Sebelumnya\r\n \r\natau ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 06:36:24', '2022-05-31 06:36:24'),
(212, 14, 56, 12, 47, 48, '', '', 1, 1, '2022-05-31 06:36:56', '2022-05-31 06:36:56'),
(213, 12, 56, 20, 23, 57, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 06:41:03', '2022-05-31 06:41:03'),
(214, 14, 57, 16, 48, 56, '', '', 1, 1, '2022-05-31 06:41:48', '2022-05-31 06:41:48'),
(215, 13, 56, 20, 23, 58, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 06:43:57', '2022-05-31 06:43:57'),
(216, 14, 58, 16, 48, 56, '', '', 1, 1, '2022-05-31 06:44:22', '2022-05-31 06:44:22'),
(217, 19, 48, 20, 23, 59, 'Silahkan pilih CS yang ingin dihubungi 😊\n \n 1 Lucy\n 2 Elyn\n 3 Okky\n 0 Menu Sebelumnya\n\nAtau ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 06:47:02', '2022-05-31 06:47:02'),
(218, 14, 59, 12, 47, 48, '', '', 1, 1, '2022-05-31 06:47:35', '2022-05-31 06:47:35'),
(219, 12, 59, 20, 23, 60, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 06:49:38', '2022-05-31 06:49:38'),
(220, 14, 60, 19, 48, 59, '', '', 1, 1, '2022-05-31 06:50:19', '2022-05-31 06:50:19'),
(221, 13, 59, 20, 23, 61, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 06:52:45', '2022-05-31 06:52:45'),
(222, 14, 61, 19, 48, 59, '', '', 1, 1, '2022-05-31 06:53:22', '2022-05-31 06:53:22'),
(223, 16, 59, 20, 23, 63, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 06:55:13', '2022-05-31 06:55:13'),
(224, 14, 63, 19, 48, 59, '', '', 1, 1, '2022-05-31 06:55:37', '2022-05-31 06:55:37'),
(225, 21, 48, 20, 23, 52, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 06:57:05', '2022-05-31 06:57:05'),
(226, 14, 52, 12, 47, 48, '', '', 1, 1, '2022-05-31 06:58:03', '2022-05-31 06:58:03'),
(227, 12, 49, 20, 23, 64, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 07:06:03', '2022-05-31 07:06:03'),
(228, 14, 64, 13, 47, 49, '', '', 1, 1, '2022-05-31 07:06:21', '2022-05-31 07:06:21'),
(229, 13, 49, 20, 23, 65, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 07:08:02', '2022-05-31 07:08:02'),
(230, 14, 65, 13, 47, 49, '', '', 1, 1, '2022-05-31 07:08:24', '2022-05-31 07:08:24'),
(231, 16, 49, 20, 23, 66, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 07:22:08', '2022-05-31 07:22:08'),
(232, 14, 66, 13, 47, 49, '', '', 1, 1, '2022-05-31 07:22:41', '2022-05-31 07:22:41'),
(233, 19, 49, 20, 23, 67, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 07:24:08', '2022-05-31 07:24:08'),
(234, 14, 67, 13, 47, 49, '', '', 1, 1, '2022-05-31 07:24:33', '2022-05-31 07:24:33'),
(235, 21, 49, 20, 23, 68, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 07:25:54', '2022-05-31 07:25:54'),
(236, 14, 68, 13, 47, 49, '', '', 1, 1, '2022-05-31 07:26:13', '2022-05-31 07:26:13'),
(237, 12, 50, 20, 23, 69, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 07:56:36', '2022-05-31 07:56:36'),
(238, 14, 69, 16, 47, 50, '', '', 1, 1, '2022-05-31 07:57:08', '2022-05-31 07:57:08'),
(241, 13, 50, 20, 23, 70, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:03:42', '2022-05-31 08:03:42'),
(242, 14, 70, 16, 47, 50, '', '', 1, 1, '2022-05-31 08:04:02', '2022-05-31 08:04:02'),
(243, 16, 50, 20, 23, 71, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:05:03', '2022-05-31 08:05:03'),
(244, 14, 71, 16, 47, 50, '', '', 1, 1, '2022-05-31 08:05:22', '2022-05-31 08:05:22'),
(245, 19, 50, 20, 23, 72, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:06:24', '2022-05-31 08:06:24'),
(246, 14, 72, 16, 47, 50, '', '', 1, 1, '2022-05-31 08:06:47', '2022-05-31 08:06:47'),
(247, 21, 50, 20, 23, 73, 'Silahkan pilih CS yang ingin dihubungi 😊\r\n \r\n 1 Anita\r\n 2 Yayang\r\n 0 Menu Sebelumnya\r\n\r\nAtau ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:09:15', '2022-05-31 08:09:15'),
(248, 14, 73, 16, 47, 50, '', '', 1, 1, '2022-05-31 08:09:35', '2022-05-31 08:09:35'),
(249, 12, 73, 20, 23, 74, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 08:11:44', '2022-05-31 08:11:44'),
(250, 14, 74, 21, 50, 73, '', '', 1, 1, '2022-05-31 08:12:09', '2022-05-31 08:12:09'),
(251, 13, 73, 20, 23, 75, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 08:13:19', '2022-05-31 08:13:19'),
(252, 14, 75, 21, 50, 73, '', '', 1, 1, '2022-05-31 08:13:39', '2022-05-31 08:13:39'),
(253, 19, 47, 20, 23, 76, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 08:18:07', '2022-06-03 04:04:23'),
(254, 14, 76, 16, 1, 47, '', '', 1, 1, '2022-05-31 08:18:38', '2022-05-31 08:18:38'),
(255, 21, 47, 20, 23, 77, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 08:19:52', '2022-05-31 08:19:52'),
(256, 14, 77, 16, 1, 47, '', '', 1, 1, '2022-05-31 08:20:18', '2022-05-31 08:20:18'),
(257, 12, 51, 20, 23, 78, 'Silahkan pilih CS yang ingin dihubungi 😊\n \n 1 Miana\n 2 Yayang\n 0 Menu Sebelumnya\n\nAtau ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:27:35', '2022-05-31 08:27:35'),
(258, 14, 78, 22, 47, 51, '', '', 1, 1, '2022-05-31 08:28:15', '2022-05-31 08:28:15'),
(259, 12, 78, 20, 23, 79, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 08:29:33', '2022-05-31 08:29:33'),
(260, 14, 79, 12, 51, 78, '', '', 1, 1, '2022-05-31 08:30:13', '2022-05-31 08:30:13'),
(261, 13, 78, 20, 23, 80, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 08:31:09', '2022-05-31 08:31:09'),
(263, 14, 80, 12, 51, 78, '', '', 1, 1, '2022-05-31 08:33:22', '2022-05-31 08:33:22'),
(264, 13, 51, 20, 23, 81, 'Silahkan pilih CS yang ingin dihubungi 😊\n \n 1 Anita\n 2 Miana\n 3 Yayang\n 0 Menu Sebelumnya\n\nAtau ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:37:16', '2022-05-31 08:37:16'),
(265, 14, 81, 22, 47, 51, '', '', 1, 1, '2022-05-31 08:38:06', '2022-05-31 08:38:06'),
(266, 12, 81, 20, 23, 82, '\nCS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:39:37', '2022-05-31 08:39:37'),
(267, 14, 82, 13, 51, 81, '', '', 1, 1, '2022-05-31 08:40:29', '2022-05-31 08:40:29'),
(268, 13, 81, 20, 23, 83, '\nCS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:41:51', '2022-05-31 08:41:51'),
(270, 14, 83, 13, 51, 81, '', '', 1, 1, '2022-05-31 08:44:47', '2022-05-31 08:44:47'),
(271, 16, 81, 20, 23, 84, '\nCS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:46:00', '2022-05-31 08:46:00'),
(272, 14, 84, 13, 51, 81, '', '', 1, 1, '2022-05-31 08:46:25', '2022-05-31 08:46:25'),
(273, 16, 51, 20, 23, 85, 'Silahkan pilih CS yang ingin dihubungi 😊\n \n 1 Yayang\n 2 Anita\n 0 Menu Sebelumnya\n\nAtau ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:48:58', '2022-05-31 08:48:58'),
(274, 14, 85, 22, 47, 51, '', '', 1, 1, '2022-05-31 08:49:52', '2022-05-31 08:49:52'),
(275, 12, 85, 20, 23, 86, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:51:26', '2022-05-31 08:51:26'),
(277, 14, 86, 16, 51, 85, '', '', 1, 1, '2022-05-31 08:56:23', '2022-05-31 08:56:23'),
(278, 13, 85, 20, 23, 87, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 08:57:47', '2022-05-31 08:57:47'),
(279, 14, 87, 16, 51, 85, '', '', 1, 1, '2022-05-31 08:58:13', '2022-05-31 08:58:13'),
(280, 19, 51, 20, 23, 88, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 09:00:00', '2022-05-31 09:00:00'),
(281, 14, 88, 22, 47, 51, '', '', 1, 1, '2022-05-31 09:00:42', '2022-05-31 09:00:42'),
(282, 23, 47, 20, 23, 90, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama\n', '', 0, 1, '2022-05-31 09:02:26', '2022-06-03 04:06:03'),
(283, 14, 90, 16, 1, 47, '', '', 1, 1, '2022-05-31 09:03:25', '2022-05-31 09:03:25'),
(284, 29, 47, 20, 23, 91, 'CS kami akan segera menghubungi anda,\nPastikan anda hanya akan menerima panggilan kami dari nomor kontak di bawah ini :  \n\nTerima kasih\n\nSilahkan Pilih : \n*0* Untuk Kembali kemenu sebelumnya atau Ketik *.home* untuk kembali ke halaman utama', '', 0, 1, '2022-05-31 09:16:27', '2022-05-31 09:16:27'),
(285, 14, 91, 16, 1, 47, '', '', 1, 1, '2022-05-31 09:16:46', '2022-06-03 06:06:39');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `Kota` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `id_menuAktif` int(11) DEFAULT NULL,
  `id_prevMenu` int(11) NOT NULL,
  `id_prevKey` int(11) NOT NULL,
  `item` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `phone`, `Kota`, `deskripsi`, `id_menuAktif`, `id_prevMenu`, `id_prevKey`, `item`, `status`, `createdAt`, `updatedAt`) VALUES
(152, 'Iga Mandagi', '6281292888295', NULL, NULL, 55, 23, 20, 'Staples', 0, '2022-05-31 04:48:47', '2022-05-31 06:31:50'),
(154, 'Sari Wijayanti', '6285715265209', NULL, NULL, 1, 1, 14, NULL, 0, '2022-05-31 05:09:02', '2022-05-31 05:09:02'),
(156, 'Ryan', '628881118187', NULL, NULL, 1, 1, 14, NULL, 0, '2022-05-31 06:09:34', '2022-05-31 06:10:21'),
(157, 'Lucy Marketing ETM', '6281332022729', NULL, NULL, 63, 23, 20, NULL, 0, '2022-05-31 06:50:56', '2022-05-31 07:00:04'),
(158, 'Mia | Ekatunggal Tunas Mandiri', '628151811122', NULL, NULL, 1, 1, 14, NULL, 0, '2022-05-31 07:06:34', '2022-05-31 07:06:34'),
(159, 'EkaTunggal Tunas Mandiri', '6282264228812', NULL, NULL, 1, 1, 14, NULL, 0, '2022-05-31 08:13:49', '2022-05-31 08:13:49'),
(161, 'Ilham Ramdhani', '6289637428874', NULL, NULL, 1, 1, 14, 'Hard Padding / Glasswool', 0, '2022-05-31 08:22:22', '2022-06-04 02:26:23'),
(162, 'Sari Yaimsa', '6282138318610', NULL, NULL, 1, 1, 14, NULL, 0, '2022-06-02 02:36:20', '2022-06-02 02:36:20'),
(163, 'Tia', '628811711845', NULL, NULL, 1, 1, 14, NULL, 0, '2022-06-02 02:43:18', '2022-06-02 02:43:18'),
(164, 'Anwar Wijaya', '628126580448', NULL, NULL, 65, 23, 20, NULL, 0, '2022-06-02 06:24:06', '2022-06-02 06:24:29'),
(165, 'Faizal Rahman', '6281990404578', NULL, NULL, 32, 23, 20, NULL, 0, '2022-06-04 01:36:03', '2022-06-04 01:52:59');

-- --------------------------------------------------------

--
-- Table structure for table `keys`
--

CREATE TABLE `keys` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `keys`
--

INSERT INTO `keys` (`id`, `name`, `status`, `createdAt`, `updatedAt`) VALUES
(12, '1', 1, '2022-03-18 05:02:19', '2022-03-18 05:02:19'),
(13, '2', 1, '2022-03-18 05:16:03', '2022-03-18 05:16:03'),
(14, '0', 1, '2022-03-18 05:41:55', '2022-03-18 05:41:55'),
(16, '3', 1, '2022-03-21 04:23:53', '2022-03-21 04:23:53'),
(19, '4', 1, '2022-04-20 07:33:14', '2022-04-20 07:33:14'),
(20, 'Disabled', 1, '2022-04-20 15:44:44', '2022-04-20 15:44:44'),
(21, '5', 1, '2022-04-21 02:47:09', '2022-04-21 02:47:09'),
(22, '6', 1, '2022-04-21 02:48:13', '2022-04-21 02:48:13'),
(23, '7', 1, '2022-04-21 02:48:15', '2022-04-21 02:48:15'),
(25, '.home', 1, '2022-04-22 06:52:53', '2022-04-22 06:52:53'),
(26, '.produk', 1, '2022-04-23 03:10:13', '2022-04-23 03:10:13'),
(27, '.cabang', 1, '2022-04-23 03:10:38', '2022-04-23 03:10:38'),
(29, '8', 1, '2022-05-30 07:27:35', '2022-05-30 07:27:35'),
(30, '9', 1, '2022-05-30 07:29:10', '2022-05-30 07:29:10'),
(31, '10', 1, '2022-05-30 07:30:41', '2022-05-30 07:30:41'),
(32, '11', 1, '2022-05-30 07:32:17', '2022-05-30 07:32:17'),
(33, '12', 1, '2022-05-30 07:33:55', '2022-05-30 07:33:55'),
(34, '99', 1, '2022-05-30 07:52:41', '2022-05-30 07:52:41'),
(35, '.cs', 1, '2022-05-30 09:20:08', '2022-05-30 09:20:08');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Home', 1, '2022-04-20 08:23:01', '2022-04-20 08:23:01'),
(23, 'Disabled', 1, '2022-04-20 15:45:02', '2022-04-20 15:45:02'),
(24, 'Produk', 1, '2022-04-20 15:56:30', '2022-04-20 15:56:30'),
(25, 'Cabang', 1, '2022-04-21 01:49:38', '2022-04-21 01:49:38'),
(26, 'Cabang_Bogor', 1, '2022-04-21 01:52:26', '2022-04-21 01:52:26'),
(27, 'Cabang_SBY', 1, '2022-04-21 02:32:33', '2022-04-21 02:32:33'),
(28, 'Cabang_Semarang', 1, '2022-04-21 02:38:09', '2022-04-21 02:38:09'),
(29, 'Cabang_Manado', 1, '2022-04-21 02:45:41', '2022-04-21 02:45:41'),
(30, 'Cabang_Makassar', 1, '2022-04-21 02:47:21', '2022-04-21 02:47:21'),
(31, 'Cabang_Samarinda', 1, '2022-04-21 02:48:28', '2022-04-21 02:48:28'),
(32, 'Cabang_Pekanbaru', 1, '2022-04-21 02:50:18', '2022-04-21 02:50:18'),
(33, 'All Menu', 1, '2022-04-22 06:35:34', '2022-04-22 06:35:34'),
(34, 'Staples', 1, '2022-05-30 06:16:57', '2022-05-30 06:16:57'),
(35, 'produk_accessories', 1, '2022-05-30 06:25:23', '2022-05-30 06:25:23'),
(36, 'produk_glasswoll', 1, '2022-05-30 06:37:32', '2022-05-30 06:37:32'),
(37, 'produk_plastik', 1, '2022-05-30 06:42:58', '2022-05-30 06:42:58'),
(38, 'produk_kawatpercoil', 1, '2022-05-30 06:46:23', '2022-05-30 06:46:23'),
(39, 'produk_kainspringbedsofa', 1, '2022-05-30 06:48:46', '2022-05-30 06:48:46'),
(40, 'produk_nonwoven', 1, '2022-05-30 06:50:45', '2022-05-30 06:50:45'),
(41, 'produk_pitalist', 1, '2022-05-30 07:27:48', '2022-05-30 07:27:48'),
(42, 'produk_busakimia', 1, '2022-05-30 07:29:22', '2022-05-30 07:29:22'),
(43, 'produk_other', 1, '2022-05-30 07:30:58', '2022-05-30 07:30:58'),
(44, 'produk_accessoriesgorden', 1, '2022-05-30 07:32:41', '2022-05-30 07:32:41'),
(45, 'produk_jasa', 1, '2022-05-30 07:34:11', '2022-05-30 07:34:11'),
(46, 'AltMenu', 1, '2022-05-30 07:54:40', '2022-05-30 07:54:40'),
(47, 'CS', 1, '2022-05-30 08:22:26', '2022-05-30 08:22:26'),
(48, 'cs_jawa', 1, '2022-05-30 08:35:00', '2022-05-30 08:35:00'),
(49, 'cs_sumatra', 1, '2022-05-30 08:37:30', '2022-05-30 08:37:30'),
(50, 'cs_sulawesi', 1, '2022-05-30 08:39:12', '2022-05-30 08:39:12'),
(51, 'cs_kalimantan', 1, '2022-05-30 08:41:10', '2022-05-30 08:41:10'),
(52, 'cs_jawa_banten', 1, '2022-05-30 08:43:56', '2022-05-30 08:43:56'),
(53, 'cs_jawa_jawabart', 1, '2022-05-30 09:17:10', '2022-05-30 09:17:10'),
(55, 'cs_jawa_jabodetabek', 1, '2022-05-31 06:16:52', '2022-05-31 06:16:52'),
(56, 'cs_jawa_jateng', 1, '2022-05-31 06:36:05', '2022-05-31 06:36:05'),
(57, 'cs_jawa_jateng_1', 1, '2022-05-31 06:39:08', '2022-05-31 06:39:08'),
(58, 'cs_jawa_jateng_2', 1, '2022-05-31 06:43:28', '2022-05-31 06:43:28'),
(59, 'cs_jawa_jatim', 1, '2022-05-31 06:45:49', '2022-05-31 06:45:49'),
(60, 'cs_jawa_jatim_1', 1, '2022-05-31 06:49:17', '2022-05-31 06:49:17'),
(61, 'cs_jawa_jatim_2', 1, '2022-05-31 06:51:52', '2022-05-31 06:51:52'),
(63, 'cs_jawa_jatim_3', 1, '2022-05-31 06:54:54', '2022-05-31 06:54:54'),
(64, 'cs_sumatra_sumbar', 1, '2022-05-31 07:05:44', '2022-05-31 07:05:44'),
(65, 'cs_sumatra_sumutaceh', 1, '2022-05-31 07:07:42', '2022-05-31 07:07:42'),
(66, 'cs_sumatra_riau', 1, '2022-05-31 07:21:43', '2022-05-31 07:21:43'),
(67, 'cs_sumatra_sumsel', 1, '2022-05-31 07:23:53', '2022-05-31 07:23:53'),
(68, 'cs_sumatra_jambi', 1, '2022-05-31 07:25:38', '2022-05-31 07:25:38'),
(69, 'cs_sulawesi_sulut', 1, '2022-05-31 07:55:58', '2022-05-31 07:55:58'),
(70, 'cs_sulawesi_sulteng', 1, '2022-05-31 07:58:07', '2022-05-31 07:58:07'),
(71, 'cs_sulawesi_selatan', 1, '2022-05-31 08:00:57', '2022-05-31 08:00:57'),
(72, 'cs_sulawesi_tenggara', 1, '2022-05-31 08:06:12', '2022-05-31 08:06:12'),
(73, 'cs_sulawesi_barat', 1, '2022-05-31 08:08:54', '2022-05-31 08:08:54'),
(74, 'cs_sulawesi_barat_1', 1, '2022-05-31 08:11:22', '2022-05-31 08:11:22'),
(75, 'cs_sulawesi_barat_2', 1, '2022-05-31 08:12:44', '2022-05-31 08:12:44'),
(76, 'cs_ntt&ntb', 1, '2022-05-31 08:17:44', '2022-05-31 08:17:44'),
(77, 'cs_bali', 1, '2022-05-31 08:19:42', '2022-05-31 08:19:42'),
(78, 'cs_kalimantan_barat', 1, '2022-05-31 08:27:01', '2022-05-31 08:27:01'),
(79, 'cs_kalimantan_barat_1', 1, '2022-05-31 08:29:02', '2022-05-31 08:29:02'),
(80, 'cs_kalimantan_barat_2', 1, '2022-05-31 08:30:51', '2022-05-31 08:30:51'),
(81, 'cs_kalimantan_tengah', 1, '2022-05-31 08:36:21', '2022-05-31 08:36:21'),
(82, 'cs_kalimantan_tengah_1', 1, '2022-05-31 08:39:14', '2022-05-31 08:39:14'),
(83, 'cs_kalimantan_tengah_2', 1, '2022-05-31 08:41:35', '2022-05-31 08:41:35'),
(84, 'cs_kalimantan_tengah_3', 1, '2022-05-31 08:45:39', '2022-05-31 08:45:39'),
(85, 'cs_kalimantan_selatan', 1, '2022-05-31 08:48:08', '2022-05-31 08:48:08'),
(86, 'cs_kalimantan_selatan_1', 1, '2022-05-31 08:50:51', '2022-05-31 08:50:51'),
(87, 'cs_kalimantan_selatan_2', 1, '2022-05-31 08:57:27', '2022-05-31 08:57:27'),
(88, 'cs_kalimantan_timur', 1, '2022-05-31 08:59:26', '2022-05-31 08:59:26'),
(90, 'cs_maluku', 1, '2022-05-31 09:02:10', '2022-05-31 09:02:10'),
(91, 'cs_papua', 1, '2022-05-31 09:16:08', '2022-05-31 09:16:08');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id_group` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `name`, `id_group`, `phone`, `status`, `createdAt`, `updatedAt`) VALUES
(6, 'Ricky', 1, '08151811155', 1, '2022-05-30 08:32:43', '2022-05-30 08:32:43'),
(7, 'Krisna', 12, '08151811133', 1, '2022-05-30 08:45:03', '2022-05-30 08:45:03'),
(8, 'Devita', 9, '081380880086', 1, '2022-05-30 09:11:40', '2022-05-30 09:11:40'),
(9, 'Linda  ', 10, '081390677710', 1, '2022-05-30 09:12:15', '2022-05-30 09:12:15'),
(10, 'Lucy  ', 11, '081332022729', 1, '2022-05-30 09:12:34', '2022-05-30 09:12:34'),
(11, 'Elyn', 11, '082244733178', 1, '2022-05-30 09:12:55', '2022-05-30 09:12:55'),
(12, 'Okky', 11, '081259710919', 1, '2022-05-30 09:13:13', '2022-05-30 09:13:13'),
(13, 'Miana', 22, '08151811122', 1, '2022-05-30 09:13:35', '2022-05-30 09:13:35'),
(14, 'Ryan', 15, '08151811112', 1, '2022-05-30 09:13:54', '2022-05-30 09:13:54'),
(15, 'Juan', 16, '08151811117', 1, '2022-05-30 09:14:11', '2022-05-30 09:14:11'),
(16, 'Ester', 22, '082192953037', 1, '2022-05-30 09:14:31', '2022-05-30 09:14:31'),
(17, 'Andi', 24, '081340704079', 1, '2022-05-30 09:14:50', '2022-05-30 09:14:50'),
(18, 'Anita', 13, '082142571097', 1, '2022-05-30 09:15:07', '2022-05-30 09:15:07'),
(19, 'Yayang', 27, '082264228812', 1, '2022-05-30 09:15:36', '2022-05-30 09:15:36'),
(20, 'Ina', 28, '085648699696', 1, '2022-05-30 09:15:59', '2022-05-30 09:15:59'),
(21, 'Agung', 21, '081255953285', 1, '2022-05-30 09:16:16', '2022-05-30 09:16:16');

-- --------------------------------------------------------

--
-- Table structure for table `salesgroups`
--

CREATE TABLE `salesgroups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salesgroups`
--

INSERT INTO `salesgroups` (`id`, `name`, `notes`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'JABODETABEK', 'Daerah Jakarta, Bogor, Depok, Bekasi', 1, '2022-04-25 04:05:15', '2022-04-25 04:05:15'),
(7, 'Kalimantan', NULL, 1, '2022-04-28 03:41:31', '2022-04-28 03:41:31'),
(9, 'Jawa Barat', '', 1, '2022-05-30 08:25:28', '2022-05-30 08:25:28'),
(10, 'jawa Tengah', '', 1, '2022-05-30 08:25:36', '2022-05-30 08:25:36'),
(11, 'Jawa Timur', '', 1, '2022-05-30 08:26:03', '2022-05-30 08:26:03'),
(12, 'Banten', '', 1, '2022-05-30 08:26:11', '2022-05-30 08:26:11'),
(13, 'Sumatera Barat', '', 1, '2022-05-30 08:26:32', '2022-05-30 08:26:32'),
(14, 'Sumatera Utara & Aceh', '', 1, '2022-05-30 08:26:42', '2022-05-30 08:26:42'),
(15, 'Riau', '', 1, '2022-05-30 08:28:00', '2022-05-30 08:28:00'),
(16, 'Sumatera Selatan', '', 1, '2022-05-30 08:28:20', '2022-05-30 08:28:20'),
(17, 'Jambi / Lampung / Bengkulu', '', 1, '2022-05-30 08:28:33', '2022-05-30 08:28:33'),
(18, 'Kalimantan Barat', '', 1, '2022-05-30 08:29:28', '2022-05-30 08:29:28'),
(19, 'Kalimantan Tengah', '', 1, '2022-05-30 08:29:42', '2022-05-30 08:29:42'),
(20, 'Kalimantan Selatan', '', 1, '2022-05-30 08:29:50', '2022-05-30 08:29:50'),
(21, 'Kalimantan Timur', '', 1, '2022-05-30 08:29:58', '2022-05-30 08:29:58'),
(22, 'Sulawesi Utara', '', 1, '2022-05-30 08:30:09', '2022-05-30 08:30:09'),
(23, 'Sulawesi Tengah', '', 1, '2022-05-30 08:30:17', '2022-05-30 08:30:17'),
(24, 'Sulawesi Selatan', '', 1, '2022-05-30 08:30:27', '2022-05-30 08:30:27'),
(25, 'Sulawesi Tenggara', '', 1, '2022-05-30 08:30:35', '2022-05-30 08:30:35'),
(26, 'Sulawesi Barat', '', 1, '2022-05-30 08:30:46', '2022-05-30 08:30:46'),
(27, 'Maluku', NULL, 1, '2022-05-30 09:15:27', '2022-05-30 09:15:27'),
(28, 'Bali', NULL, 1, '2022-05-30 09:15:52', '2022-05-30 09:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `session` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`session`)),
  `ready` tinyint(1) DEFAULT 0,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `name`, `deskripsi`, `session`, `ready`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Ilham Ramdhani', NULL, NULL, 0, 'ramdhaniit', '', '2022-03-17 05:42:21', '2022-04-12 15:20:29'),
(65, 'Ryan Hadi Dermawan', '', NULL, 0, 'ryanpa', '', '2022-03-19 03:10:20', '2022-03-19 03:10:20');

-- --------------------------------------------------------

--
-- Table structure for table `urifiles`
--

CREATE TABLE `urifiles` (
  `id` int(11) NOT NULL,
  `id_bot` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `botcontacts`
--
ALTER TABLE `botcontacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_bot` (`id_bot`);

--
-- Indexes for table `bots`
--
ALTER TABLE `bots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_menuAktif` (`id_menuAktif`),
  ADD KEY `id_prevKey` (`id_prevKey`),
  ADD KEY `id_prevMenu` (`id_prevMenu`),
  ADD KEY `id_afterMenu` (`id_afterMenu`),
  ADD KEY `id_key` (`id_key`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `id_menuAktif` (`id_menuAktif`),
  ADD KEY `id_prevMenu` (`id_prevMenu`),
  ADD KEY `id_prevKey` (`id_prevKey`);

--
-- Indexes for table `keys`
--
ALTER TABLE `keys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `id_group` (`id_group`);

--
-- Indexes for table `salesgroups`
--
ALTER TABLE `salesgroups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `urifiles`
--
ALTER TABLE `urifiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `id_bot` (`id_bot`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `botcontacts`
--
ALTER TABLE `botcontacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `bots`
--
ALTER TABLE `bots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=326;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT for table `keys`
--
ALTER TABLE `keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `salesgroups`
--
ALTER TABLE `salesgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `urifiles`
--
ALTER TABLE `urifiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `botcontacts`
--
ALTER TABLE `botcontacts`
  ADD CONSTRAINT `botcontacts_ibfk_1` FOREIGN KEY (`id_bot`) REFERENCES `bots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bots`
--
ALTER TABLE `bots`
  ADD CONSTRAINT `bots_ibfk_1` FOREIGN KEY (`id_menuAktif`) REFERENCES `menus` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bots_ibfk_2` FOREIGN KEY (`id_prevMenu`) REFERENCES `menus` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bots_ibfk_3` FOREIGN KEY (`id_afterMenu`) REFERENCES `menus` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bots_ibfk_4` FOREIGN KEY (`id_key`) REFERENCES `keys` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bots_ibfk_5` FOREIGN KEY (`id_prevKey`) REFERENCES `keys` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`id_group`) REFERENCES `salesgroups` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `urifiles`
--
ALTER TABLE `urifiles`
  ADD CONSTRAINT `urifiles_ibfk_1` FOREIGN KEY (`id_bot`) REFERENCES `bots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

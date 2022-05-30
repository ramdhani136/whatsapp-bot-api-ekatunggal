-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2022 at 10:38 AM
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
(1, 77, 1, '2022-05-23 02:55:08', '2022-05-23 02:55:08');

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
  `forward` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bots`
--

INSERT INTO `bots` (`id`, `id_key`, `id_menuAktif`, `id_prevKey`, `id_prevMenu`, `id_afterMenu`, `message`, `forward`, `status`, `createdAt`, `updatedAt`) VALUES
(77, 12, 1, 20, 23, 24, 'Pilih salah satu menu dibawah ini untuk melakukan pemesanan\r\n\r\n1 Stapless\r\n2 Aksesoris\r\n3 Hard padding\r\n4 Plastik\r\n5 Kawat & Per Coil\r\n6 Kain Springbed\r\n7 Non Woven\r\n8 Pita List Bisban\r\n9 Busa\r\n10 Other\r\n\r\nsilahkan ketik *0* untuk kembali ke *menu sebelumnya* atau ketik *.Home* untuk kembali ke *menu utama*\r\n \r\n', 0, 1, '2022-04-21 01:44:43', '2022-04-21 01:44:43'),
(79, 13, 1, 20, 23, 25, 'Kantor Cabang manakah yang kaka ingin lihat :\r\n \r\n 1 Headquarter Bogor\r\n 2 Surabaya\r\n 3 Semarang\r\n 4 Manado\r\n 5 Makassar\r\n 6 Samarinda\r\n 7 Pekanbaru\r\n \r\n pilih salah satu, contoh : *1*\r\n ketik *0* untuk kembali ke *Menu Sebelumnya* atau ketik *.home* untuk kembali ke *Menu Utama*', 0, 1, '2022-04-21 01:50:35', '2022-04-21 01:50:35'),
(81, 12, 25, 20, 23, 26, ' Kantor Vika di Bogor\r\n \r\n Jl. Pahlawan No.29A, RT.003/RW005, Sanja, Kec. Citeureup, Kabupaten Bogor, Jawa Barat 16810\r\n https://goo.gl/maps/pPFQftzdcaVAZUA67\r\n \r\n silahkan ketik *0* untuk kembali ke *Menu Sebelumnya*\r\n ketik *.home* untuk kembali ke *Menu Utama*', 0, 1, '2022-04-21 01:53:10', '2022-04-21 01:53:10'),
(84, 14, 26, 13, 1, 25, '', 1, 1, '2022-04-21 01:58:55', '2022-04-21 01:58:55'),
(85, 14, 24, 14, 1, 1, '', 1, 1, '2022-04-21 02:27:53', '2022-04-21 02:27:53'),
(86, 14, 25, 14, 1, 1, '', 1, 1, '2022-04-21 02:28:59', '2022-04-21 02:28:59'),
(87, 13, 25, 20, 23, 27, ' Kantor Vika di Sidoarjo\r\n \r\n Jl. Raya Ketimang No.1, Ketimang, Kec. Wonoayu, \r\n Kabupaten Sidoarjo, Jawa Timur 61261\r\n https://goo.gl/maps/NhQeNESEnFVA5sb38\r\n \r\n silahkan ketik *0* untuk kembali ke *Menu Sebelumnya*\r\n ketik *.home* untuk kembali ke *Menu Utama*', 0, 1, '2022-04-21 02:32:42', '2022-04-21 02:32:42'),
(88, 14, 27, 13, 1, 25, '', 1, 1, '2022-04-21 02:33:40', '2022-04-21 02:33:40'),
(89, 16, 25, 20, 23, 28, ' Kantor Vika di Semarang\r\n \r\n Jl. Gatot Subroto Kawasan Candi Blok 8E No.8 \r\n Bambankerep, Kec. Ngaliyan, Kota Semarang, Jawa Tengah \r\n 50211\r\n https://goo.gl/maps/ydwugcCm7SJjRkk29\r\n \r\n silahkan ketik *0* untuk kembali ke *Menu Sebelumnya*\r\n ketik *.home* untuk kembali ke *Menu Utama*', 0, 1, '2022-04-21 02:38:23', '2022-04-21 02:38:23'),
(90, 14, 28, 13, 1, 25, '', 1, 1, '2022-04-21 02:38:52', '2022-04-21 02:38:52'),
(91, 19, 25, 20, 23, 29, ' Kantor Vika di Manado\r\n \r\n Pergudangan Angtropolis C15/D1 (Maumbi)\r\n Kec Kalawat Kab Minahasa Utara, Sulawesi Utara, 95378\r\n https://goo.gl/maps/d7HtHDWqR5bss9qy9\r\n \r\n silahkan ketik *0* untuk kembali ke *Menu Sebelumnya*\r\n ketik *.home* untuk kembali ke *Menu Utama*', 0, 1, '2022-04-21 02:46:15', '2022-04-21 02:46:15'),
(92, 14, 29, 13, 1, 25, '', 1, 1, '2022-04-21 02:46:38', '2022-04-21 02:46:38'),
(93, 21, 25, 20, 23, 30, ' Kantor Vika di Makassar\r\n \r\n Pergudangan Business Park Blok E2 No.8 Pattene 88\r\n Pabentengang, Kec. Marusu, Kabupaten Maros, Sulawesi \r\n Selatan 90552\r\n https://goo.gl/maps/tK76Gc1gMkxQMkWRA\r\n \r\n  silahkan ketik *0* untuk kembali ke *Menu Sebelumnya*\r\n ketik *.home* untuk kembali ke *Menu Utama*', 0, 1, '2022-04-21 02:47:31', '2022-04-21 02:47:31'),
(94, 14, 30, 13, 1, 25, '', 1, 1, '2022-04-21 02:47:47', '2022-04-21 02:47:47'),
(95, 22, 25, 20, 23, 31, ' Kantor Vika di Samarinda\r\n \r\n Jl. P. Suryanata, Samarinda Central Bizpark, Bukit \r\n Pinang\r\n Kec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur, \r\n 75131\r\n \r\n silahkan ketik *0* untuk kembali ke *Menu Sebelumnya*\r\n ketik *.home* untuk kembali ke *Menu Utama*', 0, 1, '2022-04-21 02:48:49', '2022-04-21 02:48:49'),
(96, 14, 31, 13, 1, 25, '', 1, 1, '2022-04-21 02:49:35', '2022-04-21 02:49:35'),
(97, 23, 25, 20, 23, 32, ' Kantor Vika di Pekanbaru\n \n Jl. Pasir Putih KM 10 Lintas Timur, Desa Baru\n Desa Baru, Kec Siak Hulu Kab Kampar, Riau, 28452\n \n silahkan ketik *0* untuk kembali ke *Menu Sebelumnya*\n ketik *#home* untuk kembali ke *Menu Utama*', 0, 1, '2022-04-21 02:50:38', '2022-04-21 02:50:38'),
(98, 14, 32, 13, 1, 25, '', 1, 1, '2022-04-21 02:50:59', '2022-04-21 02:50:59'),
(105, 14, 1, 20, 23, 1, 'Halo kak {name} 💁🏻\nsilahkan pilih salah satu topik dibawah ini :\n\n1 Pemesanan Produk\n2 Info Alamat Kantor Pusat & Cabang\n3 Info Lainnya\n4 Berbicara dengan Customer Service\n\npilih salah satu, contoh : 2 (untuk kaka yang ingin mengetahui alamat kantor Vika)', 0, 1, '2022-04-21 03:31:57', '2022-04-21 03:31:57'),
(108, 25, 33, 14, 1, 1, '', 1, 1, '2022-04-22 06:53:57', '2022-04-22 06:53:57'),
(109, 27, 33, 13, 1, 25, '', 1, 1, '2022-04-23 03:11:15', '2022-04-23 03:11:15');

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
(81, 'Lucy Marketing ETM', '6281332022729', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-20 07:22:50', '2022-04-20 07:22:50'),
(82, 'Yamasurih', '6285624278354', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-20 07:24:17', '2022-04-20 07:24:17'),
(107, 'Sari Yaimsa', '6282138318610', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-21 05:31:43', '2022-04-21 05:31:43'),
(108, 'Sari Wijayanti', '6285715265209', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-21 06:36:35', '2022-04-21 06:36:35'),
(121, 'Ilham Ramdhani', '6289637428874', NULL, NULL, 1, 23, 20, NULL, 0, '2022-04-23 02:06:08', '2022-05-23 02:11:12'),
(122, 'Iga Mandagi', '6281292888295', NULL, NULL, 26, 23, 20, NULL, 0, '2022-04-23 02:10:31', '2022-04-23 03:16:13'),
(124, 'Puzas', '6285320404415', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-23 02:26:02', '2022-04-23 02:26:02'),
(130, 'SUHANDA', '6282112523922', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-25 06:45:54', '2022-04-25 06:45:54'),
(131, 'Hms Recing', '6282292291800', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-25 07:10:50', '2022-04-25 07:10:50'),
(132, '@hasiltanganditar', '6289636829437', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-25 08:06:03', '2022-04-25 08:06:03'),
(133, 'danny ramadhan', '6281398035085', NULL, NULL, 1, 1, 14, NULL, 0, '2022-04-25 08:08:04', '2022-04-25 08:08:04'),
(134, 'Ryan', '628881118187', NULL, '', 1, 23, 20, '', 0, '2022-05-23 02:09:06', '2022-05-23 02:09:15');

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
(27, '.cabang', 1, '2022-04-23 03:10:38', '2022-04-23 03:10:38');

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
(33, 'All Menu', 1, '2022-04-22 06:35:34', '2022-04-22 06:35:34');

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
(1, 'Ricky', 1, '089637428874', 1, '2022-04-25 04:10:07', '2022-04-25 04:10:07'),
(4, 'Ryan Hadi', 1, '08881118187', 1, '2022-04-28 03:41:55', '2022-04-28 03:41:55'),
(5, 'Ucup Sumarcup', 7, '02343344', 1, '2022-05-23 06:18:04', '2022-05-23 06:18:04');

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
(7, 'Kalimantan', NULL, 1, '2022-04-28 03:41:31', '2022-04-28 03:41:31');

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
-- Dumping data for table `urifiles`
--

INSERT INTO `urifiles` (`id`, `id_bot`, `name`, `status`, `createdAt`, `updatedAt`) VALUES
(6, 105, 'https://www.ekatunggal.com/wp-content/uploads/2020/11/logoslider02.png', 1, '2022-04-21 03:31:58', '2022-04-21 03:31:58'),
(7, 105, 'https://www.ekatunggal.com/wp-content/uploads/2020/11/logoslider01.png', 1, '2022-04-21 03:31:58', '2022-04-21 03:31:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `botcontacts`
--
ALTER TABLE `botcontacts`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bots`
--
ALTER TABLE `bots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `keys`
--
ALTER TABLE `keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `salesgroups`
--
ALTER TABLE `salesgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `urifiles`
--
ALTER TABLE `urifiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

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

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2024 at 03:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel3_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `followed_user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `receiver_id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2024_06_16_164605_create_users_table', 1),
(3, '2024_06_16_170914_add_role_to_users_table', 2),
(5, '2024_06_16_172135_create_posts_table', 3),
(6, '2024_06_16_191708_create_follows_table', 4),
(7, '2024_06_16_193645_create_follows_table', 5),
(8, '2024_06_16_205050_create_comments_table', 6),
(9, '2024_06_16_213710_create_likes_table', 7),
(10, '2024_06_16_215259_create_likes_table', 8),
(11, '2024_06_17_050958_create_likes_table', 9),
(12, '2024_06_17_082235_create_notifications_table', 10),
(13, '2024_06_17_104559_create_messages_table', 11),
(14, '2024_06_17_152842_add_related_id_to_notifications_table', 12),
(15, '2024_06_17_172427_add_profile_image_to_users_table', 13),
(16, '2024_06_22_012119_create_password_resets_table', 14),
(17, '2024_06_22_012927_create_password_reset_tokens_table', 15);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `message` varchar(255) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `type` varchar(255) NOT NULL,
  `post_id` bigint(20) UNSIGNED DEFAULT NULL,
  `comment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `related_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('test@gmail.com', '$2y$12$Kt2tWdybTciPR.1kRiVL/uCq4cKkYzB.k20UyTH81SIVYsMXVfaJa', '2024-06-21 17:42:21'),
('ratunil.edward@gmail.com', '$2y$12$ZsROUHkDgRfcy/d1Bmlojup54eywYZDJzjiK3p0JkzzllncBSdwGu', '2024-06-21 17:50:48');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'f0b5a3aa528c535b7ee51cae08c280042a8f9070f2355193d7434c899b05b62b', '[\"*\"]', NULL, NULL, '2024-06-16 08:58:50', '2024-06-16 08:58:50'),
(2, 'App\\Models\\User', 1, 'auth_token', '1b7b8ec5c71803a8d946a6cb5ad88b9e27c189fa923a4d8a0484520e65cf3ce8', '[\"*\"]', NULL, NULL, '2024-06-16 08:58:51', '2024-06-16 08:58:51'),
(3, 'App\\Models\\User', 1, 'auth_token', '816079c32722464ebde250d3c62895934e3ac9f56c3009b24121d78909ad9124', '[\"*\"]', NULL, NULL, '2024-06-16 08:58:58', '2024-06-16 08:58:58'),
(4, 'App\\Models\\User', 2, 'auth_token', 'aea69c56b9e0a740c5dad2cff52eed95dcafdf4e8ca40489e04d41f6d5f726d4', '[\"*\"]', NULL, NULL, '2024-06-16 09:05:06', '2024-06-16 09:05:06'),
(5, 'App\\Models\\User', 2, 'auth_token', 'f1e5f29639365f2826b1e3400f203888bfe1cb4fba1905b6b27d7e62273d8333', '[\"*\"]', NULL, NULL, '2024-06-16 09:05:07', '2024-06-16 09:05:07'),
(6, 'App\\Models\\User', 2, 'auth_token', 'c5ef7101646aa715ef81e24bb5425ecddd274544ef0577691eed6be3f4824df3', '[\"*\"]', NULL, NULL, '2024-06-16 09:05:14', '2024-06-16 09:05:14'),
(7, 'App\\Models\\User', 3, 'auth_token', 'df4b898abdfe317b68dd55dd605451284225cb9b30518666a892a3ba68616abf', '[\"*\"]', NULL, NULL, '2024-06-16 09:13:33', '2024-06-16 09:13:33'),
(8, 'App\\Models\\User', 3, 'auth_token', 'ad608e36961da22fe5f824ddfa21b95fe040da84cf4cee2d1fce2590caa1e398', '[\"*\"]', NULL, NULL, '2024-06-16 09:13:34', '2024-06-16 09:13:34'),
(9, 'App\\Models\\User', 3, 'auth_token', '92a44fb8c66f98beb0e875b2ea3ba734fb8179f3a73939a00bcab7cc1b4563e0', '[\"*\"]', NULL, NULL, '2024-06-16 09:13:43', '2024-06-16 09:13:43'),
(10, 'App\\Models\\User', 2, 'auth_token', '31b313b14153bd55182a7be92628bb05d625dcc4d85f23caecdb8d093f69247f', '[\"*\"]', '2024-06-16 09:28:15', NULL, '2024-06-16 09:26:31', '2024-06-16 09:28:15'),
(11, 'App\\Models\\User', 2, 'auth_token', 'e2a80be7c5739a6c2e86ccae7955f46e371c8bc7b22d46a8375c3afd94751331', '[\"*\"]', '2024-06-16 11:44:34', NULL, '2024-06-16 09:30:35', '2024-06-16 11:44:34'),
(12, 'App\\Models\\User', 2, 'auth_token', 'a1fafe11741e9429082966d822db51420ed319cfc1e5fb8a13c770cd50370753', '[\"*\"]', '2024-06-16 20:59:35', NULL, '2024-06-16 11:44:55', '2024-06-16 20:59:35'),
(13, 'App\\Models\\User', 1, 'auth_token', '254c9782201db701e177219580119fbff125286f4084d252529b18e36f2356ff', '[\"*\"]', '2024-06-16 14:43:21', NULL, '2024-06-16 11:45:00', '2024-06-16 14:43:21'),
(14, 'App\\Models\\User', 3, 'auth_token', 'f254a54247975ffbc1c02aa591ae1ebfd8e81de46cf1c3942dabadcc665e12de', '[\"*\"]', '2024-06-17 01:52:03', NULL, '2024-06-16 14:28:51', '2024-06-17 01:52:03'),
(15, 'App\\Models\\User', 2, 'auth_token', '5f0bbca1928054eb978b002d449f16b359493899412669d3bd3378c984013c2b', '[\"*\"]', '2024-06-17 09:40:21', NULL, '2024-06-16 21:00:52', '2024-06-17 09:40:21'),
(16, 'App\\Models\\User', 1, 'auth_token', '42ca028b1a1686133a767cf53ec45df6b1b334af766fc73589b0076e3f81be81', '[\"*\"]', '2024-06-17 06:05:38', NULL, '2024-06-16 21:01:04', '2024-06-17 06:05:38'),
(17, 'App\\Models\\User', 1, 'auth_token', '4d0493a774a61493f23b8f88428df996af832a1c13594d9ec740833340097047', '[\"*\"]', '2024-06-17 08:20:36', NULL, '2024-06-17 06:07:41', '2024-06-17 08:20:36'),
(18, 'App\\Models\\User', 3, 'auth_token', 'e7ae2d6c4fc2af04631a36a48e282528189626f394b55858fcad31d2a9a86d9c', '[\"*\"]', '2024-06-17 07:45:07', NULL, '2024-06-17 06:07:47', '2024-06-17 07:45:07'),
(19, 'App\\Models\\User', 1, 'auth_token', '3417632782e88bc71f957b6438d82c4dc2ae49404c0a7c31c1c13018d2f3df2e', '[\"*\"]', '2024-06-17 09:51:09', NULL, '2024-06-17 08:21:05', '2024-06-17 09:51:09'),
(20, 'App\\Models\\User', 1, 'auth_token', '800494e9b4f6c3136e759a6827022789aee6fe081b4d23cae2b8da67796114a2', '[\"*\"]', '2024-06-18 00:24:21', NULL, '2024-06-17 22:44:46', '2024-06-18 00:24:21'),
(21, 'App\\Models\\User', 1, 'auth_token', '0afabccc075aaba88a02769552908fc5eba614f9057001b0fa80bfb8582b2b8e', '[\"*\"]', '2024-06-18 00:49:10', NULL, '2024-06-18 00:24:25', '2024-06-18 00:49:10'),
(22, 'App\\Models\\User', 1, 'auth_token', 'b28cc0d8545168a65a85da81cf384d923b668d7e1dbc48e06cda876a60bbe9ec', '[\"*\"]', '2024-06-18 01:33:39', NULL, '2024-06-18 00:49:40', '2024-06-18 01:33:39'),
(23, 'App\\Models\\User', 1, 'auth_token', 'bfee4e0b446d869066213969b892db643ab33ae3a066a4462bcbb4320d8db0d2', '[\"*\"]', '2024-06-18 03:59:12', NULL, '2024-06-18 01:33:48', '2024-06-18 03:59:12'),
(24, 'App\\Models\\User', 2, 'auth_token', 'd087addcc8cd6dcbe9ab6b2ebe3d992fdd9187014f27bb05b5b64fa4d38c4842', '[\"*\"]', '2024-06-18 04:38:39', NULL, '2024-06-18 02:16:55', '2024-06-18 04:38:39'),
(25, 'App\\Models\\User', 1, 'auth_token', 'f3f277ebd78954854424d02d08fc5fb02eb8377dcb946299adeb47896461573e', '[\"*\"]', '2024-06-18 07:54:13', NULL, '2024-06-18 03:59:26', '2024-06-18 07:54:13'),
(26, 'App\\Models\\User', 1, 'auth_token', '11e9154f4a1d06c04c7adba3107ee5adaa933820f3cc0e96f2ccee1c29f58890', '[\"*\"]', '2024-06-18 04:42:06', NULL, '2024-06-18 04:42:04', '2024-06-18 04:42:06'),
(27, 'App\\Models\\User', 2, 'auth_token', 'a06486e9ef507ac749b48430bb865d26e542f76f11d0c5d1f7d7c81daae4c599', '[\"*\"]', '2024-06-18 04:42:32', NULL, '2024-06-18 04:42:12', '2024-06-18 04:42:32'),
(28, 'App\\Models\\User', 3, 'auth_token', '0d1910bd3823d0dc506c55e699bd7fad007395f514b46485513959903b60350d', '[\"*\"]', '2024-06-18 07:54:13', NULL, '2024-06-18 04:42:40', '2024-06-18 07:54:13'),
(29, 'App\\Models\\User', 1, 'auth_token', '166e8ffdbf9bd85987e782906f1515d63189e16f5a2345ca2406ac44be0c7871', '[\"*\"]', '2024-06-18 10:34:37', NULL, '2024-06-18 10:34:30', '2024-06-18 10:34:37'),
(30, 'App\\Models\\User', 1, 'auth_token', 'a7e904338c27d16edaeb751ae19675a55705d978a4d4ef1a93765e1cfe60bed9', '[\"*\"]', '2024-06-18 10:34:55', NULL, '2024-06-18 10:34:53', '2024-06-18 10:34:55'),
(31, 'App\\Models\\User', 2, 'auth_token', '07b6e0590352d10c5ae0aaf01d302d8a8b5e819c999401faef562db42d4e4a37', '[\"*\"]', '2024-06-18 10:35:22', NULL, '2024-06-18 10:34:59', '2024-06-18 10:35:22'),
(32, 'App\\Models\\User', 1, 'auth_token', '2f26db8ca035b872f8a15cb1cceb02a4fbb2b2787006bae1606c1764006b49f6', '[\"*\"]', '2024-06-20 06:41:06', NULL, '2024-06-20 06:40:53', '2024-06-20 06:41:06'),
(33, 'App\\Models\\User', 1, 'auth_token', '0b3019c87ad0423c580284f7dfcf5a307928466c56ebe0d7e56109078ee7442b', '[\"*\"]', '2024-06-20 06:59:06', NULL, '2024-06-20 06:41:18', '2024-06-20 06:59:06'),
(34, 'App\\Models\\User', 1, 'auth_token', '8a407c7c09856a75db540309623011c629a318e508562d64f95772de61d765f7', '[\"*\"]', '2024-06-20 07:16:43', NULL, '2024-06-20 06:59:45', '2024-06-20 07:16:43'),
(35, 'App\\Models\\User', 2, 'auth_token', '8b24c010336e63d212a46a3e3b8556593cf7e04cc2dc4feddc71a9e4cc8ca997', '[\"*\"]', '2024-06-20 07:16:37', NULL, '2024-06-20 06:59:48', '2024-06-20 07:16:37'),
(36, 'App\\Models\\User', 1, 'auth_token', '59553f4622de3363c7b06c24437c9157d0c292badfe448bd3a562eb5579f6a31', '[\"*\"]', '2024-06-20 09:55:08', NULL, '2024-06-20 09:51:59', '2024-06-20 09:55:08'),
(37, 'App\\Models\\User', 1, 'auth_token', 'd8b844eceaaddaf1a2929594c28775aacdb3a33e739ac1f459f40240c79467b2', '[\"*\"]', '2024-06-20 10:16:16', NULL, '2024-06-20 10:16:08', '2024-06-20 10:16:16'),
(38, 'App\\Models\\User', 1, 'auth_token', '234d4653093fd8e214016e4cff6f186ef3647bc51eb96eaf65e88100c962cb48', '[\"*\"]', '2024-06-21 00:59:25', NULL, '2024-06-20 23:57:03', '2024-06-21 00:59:25'),
(39, 'App\\Models\\User', 1, 'auth_token', '8565a003dccb649babec07722812c5f3786b2d365896666acbfd1017e0c26349', '[\"*\"]', '2024-06-21 00:59:32', NULL, '2024-06-21 00:59:30', '2024-06-21 00:59:32'),
(40, 'App\\Models\\User', 1, 'auth_token', '6a2ea252414031517ca4ee6687bd225643f9d4dbefc71c1b52a5906041ae0c34', '[\"*\"]', '2024-06-21 01:25:32', NULL, '2024-06-21 01:25:30', '2024-06-21 01:25:32'),
(41, 'App\\Models\\User', 1, 'auth_token', 'ce86846997750b11ec8ce8c87115285a79a831be1d126b1c2426b2b3e65f41dd', '[\"*\"]', '2024-06-21 01:47:57', NULL, '2024-06-21 01:27:27', '2024-06-21 01:47:57'),
(42, 'App\\Models\\User', 4, 'auth_token', '8b9a90c0c443025589b6d03d62428230d06b5162ee6ad8ce4c240ca0121076a5', '[\"*\"]', NULL, NULL, '2024-06-21 01:50:03', '2024-06-21 01:50:03'),
(43, 'App\\Models\\User', 4, 'auth_token', 'df4b3b0805c41a12c1b56de7d80c454d73de909bbc5fcf4fd9024dfc3b95e278', '[\"*\"]', NULL, NULL, '2024-06-21 01:50:04', '2024-06-21 01:50:04'),
(44, 'App\\Models\\User', 4, 'auth_token', '0a6fda8ad15336ce0c5c7d5d42f045bd4c9a75c94cfe0dc21433378329e0135c', '[\"*\"]', '2024-06-21 01:51:10', NULL, '2024-06-21 01:50:32', '2024-06-21 01:51:10'),
(45, 'App\\Models\\User', 4, 'auth_token', '41dad9873a2601d60f29101a299321ed322550931f1abac60a281335516eb3dd', '[\"*\"]', '2024-06-21 02:00:42', NULL, '2024-06-21 01:51:22', '2024-06-21 02:00:42'),
(46, 'App\\Models\\User', 4, 'auth_token', '383d0fb1acb017911f0e50f053f327a2e4a9c2419893a01f200052319cea900e', '[\"*\"]', '2024-06-21 02:01:09', NULL, '2024-06-21 02:01:07', '2024-06-21 02:01:09'),
(47, 'App\\Models\\User', 4, 'auth_token', 'b6868e332df4fd0ba3cbd176f8eb239a18024253531a0fe2c9bc6f1bdbec06cb', '[\"*\"]', '2024-06-21 02:03:20', NULL, '2024-06-21 02:01:19', '2024-06-21 02:03:20'),
(48, 'App\\Models\\User', 5, 'auth_token', '55cd0a8e4d72c0ae4fddbee4e14f4694273f3f7aadac2a22b0f2390447c305a0', '[\"*\"]', NULL, NULL, '2024-06-21 02:04:20', '2024-06-21 02:04:20'),
(49, 'App\\Models\\User', 5, 'auth_token', 'deed4f4fb209c10226ddf13b669f337a9d6ea149c226a450faf882dbfc5b0967', '[\"*\"]', '2024-06-21 02:04:34', NULL, '2024-06-21 02:04:21', '2024-06-21 02:04:34'),
(50, 'App\\Models\\User', 4, 'auth_token', '3f330cc3a595031a3d3343879b53cbe50dd8cf90965287d42300cdef4e2712f9', '[\"*\"]', '2024-06-21 02:05:00', NULL, '2024-06-21 02:04:59', '2024-06-21 02:05:00'),
(51, 'App\\Models\\User', 4, 'auth_token', 'a9fe2dd792a998a721ea21a65b7b5e40cb6a7e099b1105020d74564af044f575', '[\"*\"]', '2024-06-21 04:03:45', NULL, '2024-06-21 03:59:24', '2024-06-21 04:03:45'),
(52, 'App\\Models\\User', 4, 'auth_token', 'fdf684ed355a9585c1a3242cf86e0d7a4599f2584a3b31381db184aaf1c2362b', '[\"*\"]', '2024-06-21 04:16:07', NULL, '2024-06-21 04:03:49', '2024-06-21 04:16:07'),
(53, 'App\\Models\\User', 4, 'auth_token', 'af7edd68ef38774cc3e111dcc856b29c432f0b2ca6c7d6071d20ad8b1fbabd3b', '[\"*\"]', '2024-06-21 11:14:25', NULL, '2024-06-21 11:13:39', '2024-06-21 11:14:25'),
(54, 'App\\Models\\User', 4, 'auth_token', '788ef128bab036e817c1fd85132b10c5d0ca17d3748a6965325101cecde2d85d', '[\"*\"]', '2024-06-21 12:09:51', NULL, '2024-06-21 12:05:47', '2024-06-21 12:09:51'),
(55, 'App\\Models\\User', 4, 'auth_token', '9dccf0a3772c6ad6d65d4341a258e42aa2df6c1751ed6c7e854ba84a7eec50db', '[\"*\"]', '2024-06-21 12:10:57', NULL, '2024-06-21 12:10:04', '2024-06-21 12:10:57'),
(56, 'App\\Models\\User', 4, 'auth_token', '02ce59a8641c9e74284b801d07ac3ec403cf882be46d281f89fe405ad6e47892', '[\"*\"]', '2024-06-21 12:12:59', NULL, '2024-06-21 12:12:57', '2024-06-21 12:12:59'),
(57, 'App\\Models\\User', 4, 'auth_token', '623f8837cc34e68d3757a686591c3b77ca764b8eeffdfffabda4ec0a83378302', '[\"*\"]', NULL, NULL, '2024-06-21 12:22:25', '2024-06-21 12:22:25'),
(58, 'App\\Models\\User', 2, 'auth_token', '64866fe82e0b0720324f479cdf39a602e6f23c8f9318a04f53efa6bf67d4f545', '[\"*\"]', NULL, NULL, '2024-06-21 12:22:47', '2024-06-21 12:22:47'),
(59, 'App\\Models\\User', 2, 'auth_token', '034b92d3e9a5c897b06ca08d3480c1dab5dc81fd3bb3db1e910f85dd29428ad7', '[\"*\"]', NULL, NULL, '2024-06-21 12:36:26', '2024-06-21 12:36:26'),
(60, 'App\\Models\\User', 6, 'auth_token', '18b349a042b952c01c00d274b07991c9e7466b5e4a2757dfe40b9c564ed41366', '[\"*\"]', NULL, NULL, '2024-06-21 12:39:09', '2024-06-21 12:39:09'),
(61, 'App\\Models\\User', 6, 'auth_token', '32b46416472dadedd90f58230abeaefea2d7bb34effc2477f963aa09cca2e0b3', '[\"*\"]', NULL, NULL, '2024-06-21 12:39:10', '2024-06-21 12:39:10'),
(62, 'App\\Models\\User', 7, 'auth_token', '47d0b2e753f24e4325cf4c009ba4faff0653c0a3e21ebcf2b3a48249f4a3909c', '[\"*\"]', NULL, NULL, '2024-06-21 12:40:25', '2024-06-21 12:40:25'),
(63, 'App\\Models\\User', 7, 'auth_token', '3452dac52956e7a3bb7f5c7e21e55cca532f51482dced57bd0aacf0dd3619369', '[\"*\"]', NULL, NULL, '2024-06-21 12:40:26', '2024-06-21 12:40:26'),
(64, 'App\\Models\\User', 8, 'auth_token', '24d2613d7db4ae68f38fafaae5808d6ac89717884a02fbd10cc9cf72e484afb7', '[\"*\"]', NULL, NULL, '2024-06-21 12:41:08', '2024-06-21 12:41:08'),
(65, 'App\\Models\\User', 8, 'auth_token', 'd7e3682b62a74b1b4b5d7585adfb63b5002eae8a72ee9a692fd214604f41fce3', '[\"*\"]', NULL, NULL, '2024-06-21 12:41:09', '2024-06-21 12:41:09'),
(66, 'App\\Models\\User', 2, 'auth_token', 'b08792b8bbf714fe0570078ab1f1ff66137c8dafb139f3e77370049c5cb05547', '[\"*\"]', '2024-06-21 12:44:13', NULL, '2024-06-21 12:44:07', '2024-06-21 12:44:13'),
(67, 'App\\Models\\User', 2, 'auth_token', '96e20a8370a1992303a5d8904c0fce3bb07852d5aea850a5f5fec4d1606d5b58', '[\"*\"]', '2024-06-21 12:45:25', NULL, '2024-06-21 12:45:23', '2024-06-21 12:45:25'),
(68, 'App\\Models\\User', 2, 'auth_token', '4272cc7b0e508f6b915eb3e21697bd2a6fc8704b4ad6f039106039ba7b89bcea', '[\"*\"]', '2024-06-21 12:46:15', NULL, '2024-06-21 12:46:14', '2024-06-21 12:46:15'),
(69, 'App\\Models\\User', 2, 'auth_token', '55083095fc6ea26e674721a6f7d1c81d08f0a1a19c2cd7b3416190187e257062', '[\"*\"]', '2024-06-21 13:09:16', NULL, '2024-06-21 12:48:44', '2024-06-21 13:09:16'),
(70, 'App\\Models\\User', 2, 'auth_token', 'e13996836f120ee30558444ee94b18d73921eeb1e7c534c66392fcad6d54f3e6', '[\"*\"]', '2024-06-21 15:59:26', NULL, '2024-06-21 13:23:46', '2024-06-21 15:59:26'),
(71, 'App\\Models\\User', 2, 'auth_token', 'b6ee72c17e163d91fac18c7af48c210a0cfced463dd65f8efd75a8e4dbb1ffe1', '[\"*\"]', '2024-06-21 13:28:19', NULL, '2024-06-21 13:28:17', '2024-06-21 13:28:19'),
(72, 'App\\Models\\User', 3, 'auth_token', 'fbee83a41214e2db340e7da7509824f1b716b42e480c3580c8465aa95498869e', '[\"*\"]', '2024-06-21 14:12:59', NULL, '2024-06-21 13:28:46', '2024-06-21 14:12:59'),
(73, 'App\\Models\\User', 3, 'auth_token', 'f0a90db34f24d28fe0c25b31fa4117014c300d8a941242df6b238981ae7e1d62', '[\"*\"]', '2024-06-22 10:09:21', NULL, '2024-06-21 14:24:12', '2024-06-22 10:09:21'),
(74, 'App\\Models\\User', 2, 'auth_token', 'c606f55c4142cd1ff73b340d49c26031eea57616ea0b33a942b424bd45033a21', '[\"*\"]', '2024-06-21 16:01:13', NULL, '2024-06-21 16:01:06', '2024-06-21 16:01:13'),
(75, 'App\\Models\\User', 2, 'auth_token', 'f1506ee5de491cfe7766845a21c49867a7d6c34e1c8fee2a66402512ce3332fa', '[\"*\"]', '2024-06-21 16:55:32', NULL, '2024-06-21 16:07:01', '2024-06-21 16:55:32'),
(76, 'App\\Models\\User', 9, 'auth_token', '20c5ac39b6fe300e6021f65053691c5ad1b58be73ccf0b2a03d18aa16eee3e5e', '[\"*\"]', NULL, NULL, '2024-06-21 17:50:12', '2024-06-21 17:50:12'),
(77, 'App\\Models\\User', 9, 'auth_token', 'a2ef09626162e8d158193b644031991d78adfaa95e20853096414db40d55c053', '[\"*\"]', NULL, NULL, '2024-06-21 17:50:12', '2024-06-21 17:50:12'),
(78, 'App\\Models\\User', 2, 'auth_token', 'b4a03523d87df65fc0d9edc9e32ef77870670089bda326b35200ce405901cac1', '[\"*\"]', '2024-06-21 18:21:11', NULL, '2024-06-21 17:56:58', '2024-06-21 18:21:11'),
(79, 'App\\Models\\User', 9, 'auth_token', '3bcd740df9961db38dffd71c40dcebb2792ed95b0478a1f13e6933f551e82ad6', '[\"*\"]', '2024-06-21 18:21:11', NULL, '2024-06-21 18:07:53', '2024-06-21 18:21:11'),
(80, 'App\\Models\\User', 2, 'auth_token', 'b3cee1c9040223f8588ee8e77f45a7072b81c371e2bf3c5329a1064246310b4f', '[\"*\"]', '2024-06-23 04:55:31', NULL, '2024-06-21 18:21:20', '2024-06-23 04:55:31'),
(81, 'App\\Models\\User', 9, 'auth_token', '69610dc3b416bbea02b1ebe621efc2441239bac4657ab17baa545aed365dd4ec', '[\"*\"]', '2024-06-21 20:40:38', NULL, '2024-06-21 18:21:39', '2024-06-21 20:40:38'),
(82, 'App\\Models\\User', 2, 'auth_token', 'bcb68088a849413f187e85b6c46eb742f31187ec1f4c3c81ccae935d3f40b322', '[\"*\"]', '2024-06-21 22:22:51', NULL, '2024-06-21 21:12:57', '2024-06-21 22:22:51'),
(83, 'App\\Models\\User', 9, 'auth_token', 'f61134b2644fe8d597e860c6663f1ae9f289d268a192f5e244452139a735f455', '[\"*\"]', '2024-06-21 21:41:26', NULL, '2024-06-21 21:13:27', '2024-06-21 21:41:26'),
(84, 'App\\Models\\User', 9, 'auth_token', '4156d1ad8f912af0cef02a24649ce04871a334f9e5535969fa9a4a1d08366c1e', '[\"*\"]', '2024-06-21 22:33:42', NULL, '2024-06-21 21:42:45', '2024-06-21 22:33:42'),
(85, 'App\\Models\\User', 10, 'auth_token', 'fe16adad3d358c222c50669e444b63c8cd4ef760d2848db43fd8e986810e7957', '[\"*\"]', NULL, NULL, '2024-06-21 22:24:05', '2024-06-21 22:24:05'),
(86, 'App\\Models\\User', 10, 'auth_token', '5eab18b1ff029d0726ed61ea2adcf5457992df389ff91c3f6e854e1c59259e4a', '[\"*\"]', NULL, NULL, '2024-06-21 22:24:06', '2024-06-21 22:24:06'),
(87, 'App\\Models\\User', 10, 'auth_token', 'b62227165c6edfb86187e939bbe8f8f00a0f9fba3383f125af39b03121010efb', '[\"*\"]', '2024-06-21 22:33:59', NULL, '2024-06-21 22:24:41', '2024-06-21 22:33:59'),
(88, 'App\\Models\\User', 10, 'auth_token', '292494999b25a684bcb45320c204cb94184a96c7faacfd1acfb0c2f95f7e937d', '[\"*\"]', '2024-06-21 22:45:34', NULL, '2024-06-21 22:44:57', '2024-06-21 22:45:34'),
(89, 'App\\Models\\User', 9, 'auth_token', 'cb7e5a1aeaa7fcb25a2829392f34e1498e44640c63a56b2cf02309b45b513c0e', '[\"*\"]', '2024-06-22 10:09:08', NULL, '2024-06-22 06:18:52', '2024-06-22 10:09:08'),
(90, 'App\\Models\\User', 2, 'auth_token', '76ccc928c39b58aeed2b5a2c3e886fef12e46a3c99da81d4472494dc756c76c3', '[\"*\"]', '2024-06-23 04:40:14', NULL, '2024-06-23 04:00:34', '2024-06-23 04:40:14'),
(91, 'App\\Models\\User', 9, 'auth_token', '7223997e2ef756eda1160f3d00ae70cfdbe88c658649ad73579b80988ce02d63', '[\"*\"]', '2024-06-23 04:47:14', NULL, '2024-06-23 04:47:12', '2024-06-23 04:47:14'),
(92, 'App\\Models\\User', 11, 'auth_token', '9d1065c6440b9b8d464945dab2f0298fd85654996fc7f40ccce5b1530383a095', '[\"*\"]', NULL, NULL, '2024-06-23 04:48:18', '2024-06-23 04:48:18'),
(93, 'App\\Models\\User', 11, 'auth_token', 'f378ee680aa7655859d6ebaca2122fb81732950c0482a6456887e67e4701dd06', '[\"*\"]', NULL, NULL, '2024-06-23 04:48:19', '2024-06-23 04:48:19'),
(94, 'App\\Models\\User', 11, 'auth_token', '736753b97e9b9e73f9b43e903110d8ec67d0d6e3540c46fd1638be59d56ddcb0', '[\"*\"]', '2024-06-23 04:48:43', NULL, '2024-06-23 04:48:42', '2024-06-23 04:48:43'),
(95, 'App\\Models\\User', 11, 'auth_token', 'f2cadce86890c99605ae1b20d99a3177adce4d029c1dc7dd4f2bb5bf6b3bfb1b', '[\"*\"]', '2024-06-23 04:49:06', NULL, '2024-06-23 04:49:04', '2024-06-23 04:49:06'),
(96, 'App\\Models\\User', 11, 'auth_token', 'efad4ae66477bc7230ff184203465db61b8f7a13268d6e3cc1c692f6f06848bc', '[\"*\"]', '2024-06-23 04:49:42', NULL, '2024-06-23 04:49:40', '2024-06-23 04:49:42'),
(97, 'App\\Models\\User', 11, 'auth_token', 'c5cc702ba09fc342a564537423ead56d17de15dddd6eb8b5c698265181d75cf6', '[\"*\"]', '2024-06-23 04:51:21', NULL, '2024-06-23 04:50:59', '2024-06-23 04:51:21'),
(98, 'App\\Models\\User', 11, 'auth_token', '7d2f85940b85d74e99d80fc9ca60843dbaea57dc0ef881f4dddd56999367dcb5', '[\"*\"]', '2024-06-23 04:55:08', NULL, '2024-06-23 04:54:47', '2024-06-23 04:55:08'),
(99, 'App\\Models\\User', 11, 'auth_token', '8a9e2fdf8b0f8e3332c8750ebe53845057ff0225c562654ddd54e4caa4126bc2', '[\"*\"]', '2024-06-23 04:56:13', NULL, '2024-06-23 04:56:06', '2024-06-23 04:56:13'),
(100, 'App\\Models\\User', 11, 'auth_token', '6d01146bf4a0268d97e2111a7bc79ac91fa74c488faecbd05a2fb9f976848831', '[\"*\"]', '2024-06-23 04:57:01', NULL, '2024-06-23 04:56:59', '2024-06-23 04:57:01'),
(101, 'App\\Models\\User', 11, 'auth_token', 'f5094c5ec748a9775fbad89227bff943eb389a35acf91271a71abe4afbf7657b', '[\"*\"]', '2024-06-23 04:57:57', NULL, '2024-06-23 04:57:17', '2024-06-23 04:57:57'),
(102, 'App\\Models\\User', 11, 'auth_token', '0fe66cd674ad106906871795094457fe84ad8654f7dd44825dbab47dc9dffc0a', '[\"*\"]', '2024-06-23 05:34:58', NULL, '2024-06-23 05:14:18', '2024-06-23 05:34:58'),
(103, 'App\\Models\\User', 2, 'auth_token', '257023d7d392b208d93f4a7c302e7b59a2347d58e0503428ace740c45717a6eb', '[\"*\"]', '2024-06-23 19:36:06', NULL, '2024-06-23 18:03:48', '2024-06-23 19:36:06'),
(104, 'App\\Models\\User', 9, 'auth_token', '10c9d1b8b0bd9b2a249c29ae351c9f5f0fe7c4051f3d89bbaa51afa03a3d860e', '[\"*\"]', '2024-06-23 19:36:05', NULL, '2024-06-23 18:08:15', '2024-06-23 19:36:05'),
(105, 'App\\Models\\User', 11, 'auth_token', '6933332f5fd86882fdffce89d4b2b42283183e0eee268b76921cdb479ae61ce2', '[\"*\"]', '2024-06-23 21:03:25', NULL, '2024-06-23 21:03:02', '2024-06-23 21:03:25'),
(106, 'App\\Models\\User', 11, 'auth_token', 'd3e95fcfe839d25d9af8e01a59ec97aba8874e3da9fadc2d75479ccbf978f15c', '[\"*\"]', '2024-06-23 21:06:08', NULL, '2024-06-23 21:03:57', '2024-06-23 21:06:08'),
(107, 'App\\Models\\User', 2, 'auth_token', 'bae74b4105a6c8dc75692b6f81f37feacb3e89fe74967d10bce754fc80fa3446', '[\"*\"]', '2024-06-23 21:06:38', NULL, '2024-06-23 21:06:24', '2024-06-23 21:06:38'),
(108, 'App\\Models\\User', 11, 'auth_token', '677bb925cafc715da0142a3f03fef32675d38517a79c4fd604d9676ff96165a9', '[\"*\"]', '2024-06-23 21:10:42', NULL, '2024-06-23 21:07:13', '2024-06-23 21:10:42'),
(109, 'App\\Models\\User', 2, 'auth_token', 'd05d48b9395cea3680055271487fbe1535736a7c91407f846bc18d9579d08bfb', '[\"*\"]', '2024-06-24 01:13:53', NULL, '2024-06-24 00:56:52', '2024-06-24 01:13:53'),
(110, 'App\\Models\\User', 4, 'auth_token', '8b5b3619f77ea5f036c0eae7699f99077f8dd2579795091dd1c18f673f174620', '[\"*\"]', '2024-06-24 01:13:52', NULL, '2024-06-24 01:12:11', '2024-06-24 01:13:52'),
(111, 'App\\Models\\User', 4, 'auth_token', '25ecc36a5feec8889636024e49bacc4753b583776b922f94747dee191bf3f1c2', '[\"*\"]', '2024-06-24 02:38:33', NULL, '2024-06-24 02:38:30', '2024-06-24 02:38:33'),
(112, 'App\\Models\\User', 4, 'auth_token', 'd776ce88421fe9046f3717619c7568b7f1ada709381a6ed4c981c9954c6d2f48', '[\"*\"]', '2024-06-24 03:55:54', NULL, '2024-06-24 02:40:46', '2024-06-24 03:55:54'),
(113, 'App\\Models\\User', 4, 'auth_token', 'ff5c5b94f00de7903f68bd33a2b8901e50954edf71d1ecd23a8d27a97cd79ece', '[\"*\"]', '2024-06-24 03:56:03', NULL, '2024-06-24 03:56:01', '2024-06-24 03:56:03'),
(114, 'App\\Models\\User', 4, 'auth_token', '3262f042a8d70e224bfe69a0cba5aef6d636aa4a258f4275b4b8a5e91d6b43b1', '[\"*\"]', '2024-06-24 04:22:10', NULL, '2024-06-24 03:56:36', '2024-06-24 04:22:10'),
(115, 'App\\Models\\User', 4, 'auth_token', 'c24eff4eae9dd074d19c6bc1efb225c62b1145d6386db3b213ee970bb81d83a1', '[\"*\"]', '2024-06-24 05:51:29', NULL, '2024-06-24 05:51:27', '2024-06-24 05:51:29'),
(116, 'App\\Models\\User', 4, 'auth_token', 'a958e8381610632838a3c3bd0500479bd4e30fa2f46dbd72964166def88912d4', '[\"*\"]', '2024-06-24 05:51:45', NULL, '2024-06-24 05:51:43', '2024-06-24 05:51:45'),
(117, 'App\\Models\\User', 11, 'auth_token', 'dbf49a873aea77a85e864804119f7f77baa0e9c64f19c662a969d5da3ea330a0', '[\"*\"]', '2024-06-24 05:52:13', NULL, '2024-06-24 05:52:12', '2024-06-24 05:52:13'),
(118, 'App\\Models\\User', 11, 'auth_token', '286829705c2b5a25c4124617cfee73db8abef3df72d0e1cb1750a4465d05c50b', '[\"*\"]', '2024-06-24 05:53:22', NULL, '2024-06-24 05:53:20', '2024-06-24 05:53:22'),
(119, 'App\\Models\\User', 11, 'auth_token', 'a106cab79741f34029102b6d271ef003c6492f10d57ff45cd2c258fa4a0d9cb9', '[\"*\"]', '2024-06-24 05:56:11', NULL, '2024-06-24 05:56:09', '2024-06-24 05:56:11'),
(120, 'App\\Models\\User', 11, 'auth_token', '48a84e3471c73640baa231a508d817a20e3748f73768676efc073c827e243886', '[\"*\"]', '2024-06-24 05:58:15', NULL, '2024-06-24 05:58:14', '2024-06-24 05:58:15'),
(121, 'App\\Models\\User', 11, 'auth_token', '5342a7924a1fcd6852873577bde04d0833027301e1ce8566ba122e74ffd083d3', '[\"*\"]', '2024-06-24 06:03:41', NULL, '2024-06-24 06:01:29', '2024-06-24 06:03:41'),
(122, 'App\\Models\\User', 4, 'auth_token', 'a118c12081aa3e0d76e5075d640206a5181773380c64bdeb94db095b90f4779d', '[\"*\"]', '2024-06-24 08:11:32', NULL, '2024-06-24 08:06:09', '2024-06-24 08:11:32'),
(123, 'App\\Models\\User', 4, 'auth_token', 'eae9601da0054bfeb721d0d6c665b02eb6a9714ba5014417b980a4d3ec890f94', '[\"*\"]', '2024-06-24 08:45:55', NULL, '2024-06-24 08:40:12', '2024-06-24 08:45:55'),
(124, 'App\\Models\\User', 2, 'auth_token', '2cda825edb28697d364122657e1fd7269d2b0e52499a7574933fb8f266e428cc', '[\"*\"]', '2024-06-24 09:20:26', NULL, '2024-06-24 08:46:16', '2024-06-24 09:20:26'),
(125, 'App\\Models\\User', 12, 'auth_token', '74fa1da0e47513b3ab612aedd1b86c3b942dc767f424518bef3b2b45092baf36', '[\"*\"]', NULL, NULL, '2024-06-24 09:21:42', '2024-06-24 09:21:42'),
(126, 'App\\Models\\User', 12, 'auth_token', 'f808f3aaa6b124b9bfb6141392490886d260eddd61433a65d9c29a576e727ce2', '[\"*\"]', NULL, NULL, '2024-06-24 09:21:43', '2024-06-24 09:21:43'),
(127, 'App\\Models\\User', 12, 'auth_token', 'd005dcafaa50c1bea0f556d207157791498a1904d7273b27757c424596e6996a', '[\"*\"]', '2024-06-24 09:29:05', NULL, '2024-06-24 09:22:06', '2024-06-24 09:29:05'),
(128, 'App\\Models\\User', 12, 'auth_token', '5f139b2c96dd0761db468b9890c29f6fe12790258ccc43ba3c09d4f207e62419', '[\"*\"]', '2024-06-24 10:00:17', NULL, '2024-06-24 09:29:17', '2024-06-24 10:00:17'),
(129, 'App\\Models\\User', 13, 'auth_token', '33311602c243ec626b00cab0faa7c63a0393026107fe07e2be2151bdf47dfdc4', '[\"*\"]', NULL, NULL, '2024-06-24 09:32:58', '2024-06-24 09:32:58'),
(130, 'App\\Models\\User', 13, 'auth_token', 'd8af64a57a7e1d1b371dce275aeb7fdbf18b758484557b484912d210f6ddfd38', '[\"*\"]', NULL, NULL, '2024-06-24 09:32:59', '2024-06-24 09:32:59'),
(131, 'App\\Models\\User', 13, 'auth_token', '64c12034a61c75ae062eec78f4cd56e4552a1720a9ec629ebcb917679aa62cd6', '[\"*\"]', '2024-06-24 09:55:35', NULL, '2024-06-24 09:33:08', '2024-06-24 09:55:35'),
(132, 'App\\Models\\User', 14, 'auth_token', 'a7f79d9a58c8af3b7256b8e596218ddd604fe3ea38199632cada21430a9e2086', '[\"*\"]', NULL, NULL, '2024-06-24 09:45:36', '2024-06-24 09:45:36'),
(133, 'App\\Models\\User', 14, 'auth_token', '576c1c92028cffc804df36f7a63ca337fe2986f51323e9fc57113a259d7e998b', '[\"*\"]', NULL, NULL, '2024-06-24 09:45:37', '2024-06-24 09:45:37'),
(134, 'App\\Models\\User', 14, 'auth_token', '1f2c3956b256a94f230eccae815aa7e0d393b94f0aa1954d4fde5852bb332075', '[\"*\"]', '2024-06-24 09:48:01', NULL, '2024-06-24 09:45:56', '2024-06-24 09:48:01'),
(135, 'App\\Models\\User', 14, 'auth_token', '8078bc70492a09722ce0a79202f3d78d2f14caca141ee5d81199f2b007a43d22', '[\"*\"]', '2024-06-24 09:54:30', NULL, '2024-06-24 09:49:47', '2024-06-24 09:54:30'),
(136, 'App\\Models\\User', 13, 'auth_token', '08a3db7080d4cbb7f32e5c536b789c516d349511c71cd9286db704fe673299b3', '[\"*\"]', '2024-06-24 09:56:22', NULL, '2024-06-24 09:55:23', '2024-06-24 09:56:22'),
(137, 'App\\Models\\User', 12, 'auth_token', '2d8c19355eec44232a0d9ff57c4c21743827351df6cced0f50ba62c862070afa', '[\"*\"]', '2024-06-24 10:23:14', NULL, '2024-06-24 10:06:09', '2024-06-24 10:23:14'),
(138, 'App\\Models\\User', 14, 'auth_token', 'f92a42e5d828c8fe61e0df47a23b56eb7e3d0ceb96890edf5c0cfb8b4140ca11', '[\"*\"]', '2024-06-24 10:30:45', NULL, '2024-06-24 10:23:47', '2024-06-24 10:30:45'),
(139, 'App\\Models\\User', 14, 'auth_token', 'edf6fda853678a193db5f454fbb2adf5a52e1b66de7b3262f0ee3cec22302369', '[\"*\"]', '2024-06-24 10:35:53', NULL, '2024-06-24 10:30:58', '2024-06-24 10:35:53'),
(140, 'App\\Models\\User', 14, 'auth_token', 'bf1e89375de35abffbd8c2b9bbc2cce8a132aafed23797e63c734e105e34e92e', '[\"*\"]', '2024-06-24 10:47:49', NULL, '2024-06-24 10:36:01', '2024-06-24 10:47:49'),
(141, 'App\\Models\\User', 13, 'auth_token', '22a7b55a1c3f7b1afc7b64346709e10010e35b4287519109cbcf5d96a9231291', '[\"*\"]', '2024-06-24 10:48:02', NULL, '2024-06-24 10:48:00', '2024-06-24 10:48:02'),
(142, 'App\\Models\\User', 14, 'auth_token', '60fc89462c80d13f5255bf62d188230c77acc688340c80879ad95c32d704e1d0', '[\"*\"]', '2024-06-24 10:48:17', NULL, '2024-06-24 10:48:09', '2024-06-24 10:48:17'),
(143, 'App\\Models\\User', 15, 'auth_token', '383a7cbb71aa3d24072908bb9fb3d0860fa53ca2a4ef6f879629df28a5a7819d', '[\"*\"]', NULL, NULL, '2024-06-24 10:50:16', '2024-06-24 10:50:16'),
(144, 'App\\Models\\User', 15, 'auth_token', '84d518949031028714c779aa3f5e8ec312fc7e74501b42c7c218ff99da109abf', '[\"*\"]', NULL, NULL, '2024-06-24 10:50:17', '2024-06-24 10:50:17'),
(145, 'App\\Models\\User', 15, 'auth_token', '567f1ddc5cc0e11621fedf4d08ca7fbbe112d74b12300ce7a3c39df72df20f58', '[\"*\"]', '2024-06-24 10:50:41', NULL, '2024-06-24 10:50:39', '2024-06-24 10:50:41'),
(146, 'App\\Models\\User', 15, 'auth_token', 'df2f2ba0c11904c845e48f04a8565035196d9971c6d46835fb0b4d558686f8a9', '[\"*\"]', '2024-06-24 10:57:59', NULL, '2024-06-24 10:51:02', '2024-06-24 10:57:59'),
(147, 'App\\Models\\User', 15, 'auth_token', '3d4ef6562435857ee110caccaa1e78244a80ab37bf69f4fef56ad31f4faea7dd', '[\"*\"]', '2024-06-24 10:58:37', NULL, '2024-06-24 10:58:35', '2024-06-24 10:58:37'),
(148, 'App\\Models\\User', 15, 'auth_token', '7fb87ad8c62a915eace694ad36d4ae7650579ab274ea06cb433c377735a0bd74', '[\"*\"]', '2024-06-24 10:59:56', NULL, '2024-06-24 10:59:54', '2024-06-24 10:59:56'),
(149, 'App\\Models\\User', 15, 'auth_token', '89db505bccca7f73e51eef7dd0165cb08018ae97affb227e4afc8d827ed28e27', '[\"*\"]', '2024-06-24 11:10:59', NULL, '2024-06-24 11:04:21', '2024-06-24 11:10:59'),
(150, 'App\\Models\\User', 13, 'auth_token', '3be51c486b1d6154071e38ffa93f1d56a59c742f2d074137aaf07cc8148f7f0d', '[\"*\"]', '2024-06-24 11:11:29', NULL, '2024-06-24 11:11:07', '2024-06-24 11:11:29'),
(151, 'App\\Models\\User', 15, 'auth_token', '957ef4cd20540df2eec979720f2de6af0e40cfceee9282df4e6b62e3909c78eb', '[\"*\"]', '2024-06-24 11:31:34', NULL, '2024-06-24 11:11:37', '2024-06-24 11:31:34'),
(152, 'App\\Models\\User', 13, 'auth_token', '7e8de9cb60c7c4a8b0a98563e5fcecb8217d3aa9996f07ef3c994552117ee5b0', '[\"*\"]', '2024-06-24 11:33:23', NULL, '2024-06-24 11:32:30', '2024-06-24 11:33:23'),
(153, 'App\\Models\\User', 15, 'auth_token', '76067ef7d21dd47ab2da17d4174146490bc7c205d46e585647eadf2d76e465ac', '[\"*\"]', '2024-06-24 12:27:53', NULL, '2024-06-24 11:33:34', '2024-06-24 12:27:53'),
(154, 'App\\Models\\User', 16, 'auth_token', 'aaa731f1cc4cbb593cc7c00578cf5b3862081f476371a53bd0705fd63e4c25d2', '[\"*\"]', NULL, NULL, '2024-06-24 11:48:12', '2024-06-24 11:48:12'),
(155, 'App\\Models\\User', 16, 'auth_token', '24173f6cd30b78fb231f36c3f1d3d85a71492a2f4a15534826fb094493a792a1', '[\"*\"]', NULL, NULL, '2024-06-24 11:48:12', '2024-06-24 11:48:12'),
(156, 'App\\Models\\User', 17, 'auth_token', '9c7877539dfb95dfc8b402b5a5a540edeb7709d090dfe0fe5f7dc8e527606ed9', '[\"*\"]', NULL, NULL, '2024-06-24 11:57:38', '2024-06-24 11:57:38'),
(157, 'App\\Models\\User', 17, 'auth_token', '0a712928d04582f7a94984d64b8fb82acc527eb9b036a7d7f2131f0d6a83fad2', '[\"*\"]', NULL, NULL, '2024-06-24 11:57:38', '2024-06-24 11:57:38'),
(158, 'App\\Models\\User', 13, 'auth_token', '77f301ee2bf909422e4396c8e5edf200241f7a140c1f31f4b5754af3ba5fce6f', '[\"*\"]', '2024-06-24 12:28:43', NULL, '2024-06-24 12:28:21', '2024-06-24 12:28:43'),
(159, 'App\\Models\\User', 15, 'auth_token', '596b388a457266f9ca51ce9f1dd17a16358bad5496ebd31443c32aba06d4bc61', '[\"*\"]', '2024-06-24 12:33:20', NULL, '2024-06-24 12:28:52', '2024-06-24 12:33:20'),
(160, 'App\\Models\\User', 13, 'auth_token', 'a2f3df866fa0034ac65183c9599fb65997224c5771a841774cb8e97ccc3bc60e', '[\"*\"]', '2024-06-24 12:34:04', NULL, '2024-06-24 12:33:31', '2024-06-24 12:34:04'),
(161, 'App\\Models\\User', 15, 'auth_token', '81d88b410e2822460b3121a29b5e71cecaeb6505023e271197f8ddda01dbac3f', '[\"*\"]', '2024-06-24 12:37:07', NULL, '2024-06-24 12:34:13', '2024-06-24 12:37:07'),
(162, 'App\\Models\\User', 13, 'auth_token', 'b013c96961c9e4d3a457a6b64d7a9450763d42befa2b2c326761da8b83f44bb4', '[\"*\"]', '2024-06-24 12:37:44', NULL, '2024-06-24 12:37:42', '2024-06-24 12:37:44'),
(163, 'App\\Models\\User', 13, 'auth_token', 'ed01545b2d06050fb122c6e8091deb61833242a9336c880aeb3ad6a724bd9fa5', '[\"*\"]', '2024-06-24 12:44:16', NULL, '2024-06-24 12:40:48', '2024-06-24 12:44:16'),
(164, 'App\\Models\\User', 13, 'auth_token', 'e55567ef768edcd6c06c73eaa5ef60ad3576ce659de4ad87e0b2f5e51a056d1a', '[\"*\"]', '2024-06-24 17:44:30', NULL, '2024-06-24 17:44:26', '2024-06-24 17:44:30'),
(165, 'App\\Models\\User', 15, 'auth_token', '5247fa3edd45a115776b77bdcfb4b50af62c0923202a303ecdbc43c19362a036', '[\"*\"]', '2024-06-24 17:45:31', NULL, '2024-06-24 17:44:37', '2024-06-24 17:45:31'),
(166, 'App\\Models\\User', 13, 'auth_token', 'dcbedacc6f34deddc2c85690bf4806e6a09967046982f795fa784dc927eb64c1', '[\"*\"]', '2024-06-24 17:47:05', NULL, '2024-06-24 17:45:45', '2024-06-24 17:47:05'),
(167, 'App\\Models\\User', 15, 'auth_token', 'f1613e20434017f097abc38dc96b6d28818acbb464b281a0a50291eaaa794f24', '[\"*\"]', '2024-06-24 17:48:42', NULL, '2024-06-24 17:48:21', '2024-06-24 17:48:42'),
(168, 'App\\Models\\User', 14, 'auth_token', '3d4a6c2274223d5e8ab93c557592438c1c30de7bedc65fc4d8fc48df2c76ce15', '[\"*\"]', '2024-06-24 17:49:00', NULL, '2024-06-24 17:48:54', '2024-06-24 17:49:00'),
(169, 'App\\Models\\User', 13, 'auth_token', '8974822503c3eaee50b46fda5b0fbe76023d147e92a618fca0cfc6b642262746', '[\"*\"]', '2024-06-24 18:41:43', NULL, '2024-06-24 18:41:01', '2024-06-24 18:41:43'),
(170, 'App\\Models\\User', 15, 'auth_token', '7efd002d29bb022c76884cf23774a61ecf2c1a9626708d4244289afa589a23fe', '[\"*\"]', '2024-06-24 18:42:00', NULL, '2024-06-24 18:41:54', '2024-06-24 18:42:00'),
(171, 'App\\Models\\User', 13, 'auth_token', 'e7d3dcb8529eef2959f0614fb48d40e4f0efcb9760a53d2e2a3583fc42449b76', '[\"*\"]', '2024-06-24 18:43:35', NULL, '2024-06-24 18:42:51', '2024-06-24 18:43:35'),
(172, 'App\\Models\\User', 15, 'auth_token', 'f48356433c8cdc3637f910ae769b3b31f8fc3aa8981993c6ac5e48d517a05075', '[\"*\"]', '2024-06-24 18:43:57', NULL, '2024-06-24 18:43:43', '2024-06-24 18:43:57'),
(173, 'App\\Models\\User', 13, 'auth_token', '067421f892778c5b1ab5bffc064ea620bedb70b9383c79e63f4581a2264187eb', '[\"*\"]', '2024-06-24 18:45:13', NULL, '2024-06-24 18:44:31', '2024-06-24 18:45:13'),
(174, 'App\\Models\\User', 13, 'auth_token', 'a93d1336916ba0896804b082a7646ecf9860fe7a1a45af3bbf57a584834e6326', '[\"*\"]', '2024-06-24 19:10:47', NULL, '2024-06-24 19:10:44', '2024-06-24 19:10:47'),
(175, 'App\\Models\\User', 12, 'auth_token', '92cacc555688ece01a14b7fb8ac2de6e11c74de2a5f9fdb07a03862938bde09a', '[\"*\"]', '2024-06-24 19:22:26', NULL, '2024-06-24 19:12:48', '2024-06-24 19:22:26'),
(176, 'App\\Models\\User', 20, 'auth_token', '44892d7e9b4ec7e4e8678db34f938d27f17bf618a7bb8cee64b6767c9a986400', '[\"*\"]', NULL, NULL, '2024-06-24 19:17:43', '2024-06-24 19:17:43'),
(177, 'App\\Models\\User', 20, 'auth_token', 'eab83b0feaecb90c7350f8fdc37c7da06689eefe4558816399ab1085d655e5e3', '[\"*\"]', NULL, NULL, '2024-06-24 19:17:43', '2024-06-24 19:17:43'),
(178, 'App\\Models\\User', 20, 'auth_token', '8f52a189622e87746c62156a8354aa4c7aeaa3da1574e1208d8bf9c42cbea10a', '[\"*\"]', '2024-06-24 19:18:07', NULL, '2024-06-24 19:18:04', '2024-06-24 19:18:07'),
(179, 'App\\Models\\User', 20, 'auth_token', 'ba5a48ad1805068aa1b3c716b117ad31281febd72dad9d5b184af5478f8f46d8', '[\"*\"]', '2024-06-24 19:24:00', NULL, '2024-06-24 19:18:56', '2024-06-24 19:24:00'),
(180, 'App\\Models\\User', 15, 'auth_token', '3d6155804e428c521dcf74fc00e204858c8a3fd1479d3fd0d5a211cec8dbdf5d', '[\"*\"]', '2024-06-24 19:41:06', NULL, '2024-06-24 19:39:31', '2024-06-24 19:41:06');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `birthdate` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_post_id_foreign` (`post_id`),
  ADD KEY `comments_user_id_foreign` (`user_id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follows_user_id_foreign` (`user_id`),
  ADD KEY `follows_followed_user_id_foreign` (`followed_user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `likes_user_id_foreign` (`user_id`),
  ADD KEY `likes_post_id_foreign` (`post_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_sender_id_foreign` (`sender_id`),
  ADD KEY `messages_receiver_id_foreign` (`receiver_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`),
  ADD KEY `notifications_post_id_foreign` (`post_id`),
  ADD KEY `notifications_comment_id_foreign` (`comment_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD KEY `password_reset_tokens_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `follows`
--
ALTER TABLE `follows`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=219;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_followed_user_id_foreign` FOREIGN KEY (`followed_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follows_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_comment_id_foreign` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

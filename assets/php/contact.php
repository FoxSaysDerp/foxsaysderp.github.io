<?php
$header = ('Content-Type: text/html; charset=UTF-8');

	$to = "foxsaysderp@gmail.com";
	$subject = "Wiadomość ze strony";

	if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"])) {

		$content  = "Imię: "     . $_POST["name"]    . "\r\n";
		$content .= "E-mail: "    . $_POST["email"]   . "\r\n";
		$content .= "Wiadomość: "  . "\r\n" . $_POST["message"];

		if (mail($to, $subject, $content, $_POST["email"])) {

			$result = array(
				"message" => "Dziękujemy za kontakt z nami.",
				"sendstatus" => 1
			);

			echo json_encode($result);

		} else {

			$result = array(
				"message" => "Coś poszło nie tak, spróbuj jeszcze raz.",
				"sendstatus" => 0
			);

			echo json_encode($result);

		}

	}

?>

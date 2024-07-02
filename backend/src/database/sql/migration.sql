USE fridge;
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  expiry_date DATE NOT NULL,
  type ENUM('grão','carne', 'hortifruti', 'bebida', 'doce', 'pronta', 'outro' ) NOT NULL
)
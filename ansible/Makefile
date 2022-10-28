venv = ./venv
bin = ${venv}/bin/

vault-password=--vault-password-file ./vault-password
env-opts=-i environments/$(env)/hosts -e @environments/$(env)/secrets

export ANSIBLE_CONFIG = ./ansible.cfg

install:
	python3 -m venv ${venv}
	${bin}pip install -U pip setuptools wheel
	${bin}pip install -r requirements.txt
	@echo $(${bin}ansible --version)

ping:
	${bin}ansible ${vault-password} ${env-opts} web -m ping

secrets:
	${bin}ansible-vault edit ${vault-password} environments/$(env)/secrets

provision:
	${bin}ansible-playbook ${vault-password} ${env-opts} -t provision ./playbook.yml

deploy:
	${bin}ansible-playbook ${vault-password} ${env-opts} -t deploy ./playbook.yml

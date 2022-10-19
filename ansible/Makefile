venv = ./venv
bin = ${venv}/bin/
env-opts=-i environments/$(env)/hosts

export ANSIBLE_CONFIG = ./ansible.cfg

install:
	python3 -m venv ${venv}
	${bin}pip install -U pip setuptools wheel
	${bin}pip install -r requirements.txt
	@echo $(${bin}ansible --version)

ping:
	${bin}ansible ${env-opts} web -m ping

provision:
	${bin}ansible-playbook ${env-opts} -t provision ./playbook.yml

deploy:
	${bin}ansible-playbook ${env-opts} -t deploy ./playbook.yml
